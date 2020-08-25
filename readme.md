# open feign support in typescript use axios

Example

```
class RestApi {
	@get("/get/{a}?b={b}")
	public async getTest(param: object):Promise<void> {
		throw -1;
	}
	@post("/post/{a}?b={b}")
	public async postTest(param: object, body: any):Promise<object> {
		throw -1;
	}
	@put("/put/{a}?b={b}")
	public async putTest(param: object, body: any):Promise<object> {
		throw -1;
	}
	@del("/delete/{a}?b={b}")
	public async deleteTest(param: object, body: any):Promise<object> {
		throw -1;
	}
}

const feign = new FeignBuilder(axios);
const oTest = feign.target(RestApi);

```

Get with params
```
const rt = await oTest.getTest( {a:100, b:200});
```
Post with body
```
const body = {data: 1};
const rt = await oTest.postTest( {a:100, b:200}, body);
```