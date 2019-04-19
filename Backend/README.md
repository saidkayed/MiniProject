Why would you consider a Scripting Language as JavaScript as your Backend Platform?
JS is very versatile thanks to the MERN(MongoDB, Express, React, and Node) stack we use. These are all JS based techs that let us use the same language for both Front- and Backend. This ensures better coherence in the code and makes it easier for all members of a development team to work together. JS is also asynchronous, letting developers utilize a form of threading.

Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat
Pros:

JS is the most popular programming language today, meaning it is easy to communicate with not just your own website but also other websites.
Since JS is asynchronous, Node.js is therefore also asynchronous. This ensures that the backend will never block and users should experience lower load times.
Cons:

JS isn't as good at performing heavy work as Java is, meaning heavy calculations or very heavy tasks will be slower. This doesn't mean you HAVE to run a Java backend, since a Node.js backend can still do this. It just means it won't do it as well as a Java backend would.
Node.js is relatively new, therefore there is not as much support for any issues that may arise. This means that if a serious issue arises you might be able to find any help fixing it.
Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.
One would either have to run a VM solution on the server(this way you utilize the cores by running a VM per core. This would require that you have the individual instances coordinate data with each other though.) or create ones own thread class.

Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:
- Ensure that you Node-process restarts after a (potential) exception that closed the application
Express' own docs recommend using a process manager. (https://expressjs.com/en/advanced/pm.html)

- Ensure that you Node-process restarts after a server (Ubuntu) restart
Process manager can handle this.

- Ensure that you can run “many” node-applications on a single droplet on the same port (80)
This can be done using NGINX. (https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

Explain, generally, what is meant by a NoSQL database.
NoSQL means "Not SQL" OR "Not only SQL", depending who you ask. Both names are technically correct.

Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.
Pros:

It is very easy to scale NoSQL.
You can easily store very large amounts of data.
It is much easier to both design, maintain, and repair a NoSQL database than is the case with a traditional SQL database.
You can essentially extend NoSQL storage by simply "slapping on" extra storage.
Cons:



NoSQL is still(in database terms) young, especially the newer models. This means that you have less established standards and risk an overall less stable database over time. One can compare it to different ways of constructing a house. The new way might be faster, but is it still not known if it is as stable long term as the old way.
Harder to extract data for analytics. The way many NoSQL databases, looking specifically at MongoDB here, are designed it is much harder to extract analytically relevant data such as "british male users age 20-29".
Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB
Mongoose helps ensure the data added to MongoDB remains similar, eg. that there are no harmful differences between two "person" or two "house".




One: favor embedding unless there is a compelling reason not to
Two: needing to access an object on its own is a compelling reason not to embed it
Three: Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
Four: Don’t be afraid of application-level joins: if you index correctly and use the projection specifier (as shown in part 2) then application-level joins are barely more expensive than server-side joins in a relational database.
Five: Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing.
Six: As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.
