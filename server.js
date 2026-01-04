const fastify = require("fastify")({logger: true});
const data = require("./db_moc");

// get
fastify.get("/users", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    return data.users
})

fastify.get("/user/:id", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    let id = request.params.id;
    
    if (id) {
        let user = data.users.find((u) => u.id == id) // type issue
        console.log(user, id, data.users)
        
        if (user) {
            return user
        }

        fastify.log.error('User not found') 
        reply.send(new Error('User not found')) // returns error w 500 code
    }
})

fastify.get("/posts", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");
    
    return data.posts
})

fastify.get("/post/:id", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    let id = request.params.id;
    
    if (id) {
        let post = data.posts.find((u) => u.id == id)
            
            if (post) {
                return post
            }

            fastify.log.error('Post not found') 
            reply.send(new Error('Post not found'))
    }
})

fastify.get("/posts/user/:id", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    let authorId = request.params.id;
    
    if (authorId) {
            let posts = data.posts.filter((u) => u.authorId == authorId)
            
            if (!!posts.length) {
                return posts
            }

            fastify.log.error('Posts not found for this user') 
            reply.send(new Error('Posts not found for this user'))
    }
})

// post
fastify.post("/user", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");

    // add check for existed user

    data.users.push(request.body)
})

fastify.post("/post", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");

    // add check for existed post add validation

    data.users.push(request.body)
})

const start = async () => {
    try {
        fastify.listen({port: 3001})
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }   
}

start()
