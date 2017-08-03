import http.client

def makeAuthHeaders(jwt):
	headers = {
			'content-type': "application/json",
			'jwt': jwt
			}
	return headers
	#extract jwt from here
	
class Login:
	def login(self,url,api, username, password):
		resource = "auth"
		payload = "{\r\n    \"username\":\""+username+"\",\r\n    \"password\":\""+password+"\"\r\n}\r\n"
		headers = {
			'content-type': "application/json"
			}
		conn = http.client.HTTPConnection(url)
		conn.request("POST", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data

class Users:
	resource="users"
	
	def createUser(self,url,api,jwt,username,password):
		payload = "{\r\n    \"username\":\""+username+"\",\r\n    \"password\":\""+password+"\",\r\n    \"admin\":\"false\"\r\n}\r\n"
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPConnection(url)
		conn.request("POST", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def readUser(self,url,api,jwt,id):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPConnection(url)
		conn.request("GET", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def updateUser(self,url,api,jwt,id,username,password,roles,admin):	
		# example roles blog-editor project-editor task-editor user-editor kanbanslot-editor bank-editor
		payload = "{\r\n    \"username\":\""+username+"\",\r\n    \"password\":\""+password+"\",\r\n    \"roles\":\""+roles+"\",\r\n    \"admin\": "+admin+"\r\n}"
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPConnection(url)
		conn.request("PUT", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data


	def deleteUser(self,url,api,jwt,id):
		conn = http.client.HTTPConnection(url)
		conn.request("DELETE", api+resource+"/"+id, headers=headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data		
		
	def listUsers (self,url,api,jwt):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPConnection(url)
		conn.request("GET", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

class CRUDL:
	def create(self,url,api,resource,jwt,payload):
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPConnection(url)
		conn.request("POST", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def read(self,url,api,resource,jwt,id):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPConnection(url)
		conn.request("GET", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def update(self,url,api,resource,jwt,id,payload):	
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPConnection(url)
		conn.request("PUT", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data	

	def delete(self,url,api,resource,jwt,id):
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPConnection(url)
		conn.request("DELETE", api+resource+"/"+id, headers=headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data	

		
	def list (self,url,api,resource,jwt):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPConnection(url)
		conn.request("GET", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	


print("running tests")

username="usernameInHere"
password="passwordInHere"
url = "www.talkisbetter.com"
api="/api/"

login=Login()
loginResponse = login.login(url,api,username,password)

#user is admin only for all CRUDL
topic = "user" 
resource=topic+"s"
editorRole = topic+"editor"

#blog is public for RL editor for CUD
topic = "blog" 
resource=topic+"s"
editorRole = topic+"editor"

#project is public for RL editor for CUD
topic="project"
resource=topic+"s"
editorRole = topic+"editor"

#task is public for RL editor for CUD
topic="task"
resource=topic+"s"
editorRole = topic+"editor"

#bank is personal for CRUDL (only resources for userId in Jwt)
topic="bank"
resource=topic+"s"
editorRole = topic+"editor"

#tests to run:
#	login
#	CRUDL users. Make a user with all rights to all resources
#	make users with admin (true,false), editor or no editor for resources. 
#	test response with expired jwt, incorrectly signed jwt, no auth for resource.


