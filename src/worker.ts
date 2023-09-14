export class TestObject {
	async fetch(request) {
	  const { pathname } = new URL(request.url);
	  if (pathname === "/1") {
		return new Response(); // ✅
	  } else if (pathname === "/2") {
		return new Response("body"); // `TypeError: Can't read from request stream after response has been sent.`
	  } else if (pathname === "/3") {
		console.log(request);
		await request.body.pipeTo(new WritableStream());
		return new Response("body"); // ✅
	  }
	  return new Response(null, { status: 404 });
	}
  }
  
  export default {
	async fetch(request, env, ctx) {
	  const id = env.OBJECT.idFromName("");
	  const stub = env.OBJECT.get(id);
	  return stub.fetch(request);
	},
  };
  