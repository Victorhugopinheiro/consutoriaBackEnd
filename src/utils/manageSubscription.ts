import { stripe } from './stripe'
import prismaClient from '../prisma';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
){

  const findUser = await prismaClient.user.findFirst({
    where:{
      stripe_customer_id: customerId,
    },
    include:{
      subscriptions: true,
    }
  })

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    priceId: subscription.items.data[0].price.id,
    status:subscription.status
  }

  if(createAction){
    console.log(subscriptionData);

    try{

      await prismaClient.subscription.create({
        data: subscriptionData
      })

    }catch(err){
      console.log("ERRO CREATE")
      console.log(err);
    }

  }else{
    // Se nao estiver criando apenas atualizamos as informaçoes

    if(deleteAction){
      await prismaClient.subscription.delete({
        where:{
          id: subscriptionId,
        }
      })

      return;
    }

    try{

     await prismaClient.subscription.update({
      where:{
        id: subscriptionId
      },
      data:{
        priceId: subscription.items.data[0].price.id,
        status:subscription.status
      }
     }) 

    }catch(err){
      console.log("ERRO UPDATE HOOK")
      console.log(err);
    }

  }

}