import { PrismaClient } from '@prisma/client'
import { encrypt } from '@/utils/encrypt' 

const prisma = new PrismaClient().$extends({
  query: {
    user:{
      async $allOperations({args, operation,query}){
        if(operation === 'create'){
          const encryptedPassword = await encrypt(args.data.password);
          return query({
            ...args,
            data:{
              ...args.data,
              password: encryptedPassword
            }
          })
        }
        if(operation === 'update'){
          if(args.data.password){
            const passwordString = args.data.password as string;
            const encryptedPassword = await encrypt(passwordString);
            return query({
              ...args,
              data:{
                ...args.data,
                password: encryptedPassword
              }
            })
          }
        }
        return query(args)
      }
    }
  },
})
  

export default prisma

