import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main () {
 const user = await prisma.user.create({
    data: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatarUrl: 'https://github.com/hiagomu.png'
    }
 })

 const pool = await prisma.pool.create({
    data: {
        title: 'Example Pool',
        code: 'BOL123',
        ownerId: user.id,

        participants: {
            create: {
                userId: user.id
            }
        }
    }
 })

 await prisma.game.create({
    data: {
        date: '2022-11-01T22:54:11.738Z',
        firstTeamCoutryCode: 'DE',
        secondTeamCountryCode: 'BR'
    }
 })

 await prisma.game.create({
    data: {
        date: '2022-11-03T22:54:11.738Z',
        firstTeamCoutryCode: 'BR',
        secondTeamCountryCode: 'AR',

        guesses: {
            create: {
                firstTeamPoint: 2,
                secondTeamPoint: 1,

                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id
                        }
                    }
                }
            }
        }
    }
 })
}



main()