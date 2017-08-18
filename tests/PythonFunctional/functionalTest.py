import os
import json
#set these to username and password to test the application
# run this as export shakeAdminLogin = "value" ; export shakeAdminPassword = "value; python3.5 functionalTest.py

adminLogin =  os.environ['shakeAdminLogin']
adminPassword =  os.environ['shakeAdminPassword']


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
		conn = http.client.HTTPSConnection(url)
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
		conn = http.client.HTTPSConnection(url)
		conn.request("POST", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def readUser(self,url,api,jwt,id):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPSConnection(url)
		conn.request("GET", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def updateUser(self,url,api,jwt,id,username,password,roles,admin):	
		# example roles blog-editor project-editor task-editor user-editor kanbanslot-editor bank-editor
		payload = "{\r\n    \"username\":\""+username+"\",\r\n    \"password\":\""+password+"\",\r\n    \"roles\":\""+roles+"\",\r\n    \"admin\": "+admin+"\r\n}"
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPSConnection(url)
		conn.request("PUT", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data


	def deleteUser(self,url,api,jwt,id):
		conn = http.client.HTTPSConnection(url)
		conn.request("DELETE", api+resource+"/"+id, headers=headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data		
		
	def listUsers (self,url,api,jwt):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPSConnection(url)
		conn.request("GET", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

class CRUDL:
	def create(self,url,api,resource,jwt,payload):
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPSConnection(url)
		conn.request("POST", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def read(self,url,api,resource,jwt,id):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPSConnection(url)
		conn.request("GET", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

	def update(self,url,api,resource,jwt,id,payload):	
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPSConnection(url)
		conn.request("PUT", api+resource+"/"+id, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data	

	def delete(self,url,api,resource,jwt,id):
		headers = makeAuthHeaders(jwt)
		conn = http.client.HTTPSConnection(url)
		conn.request("DELETE", api+resource+"/"+id, headers=headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))	
		return data	

		
	def list (self,url,api,resource,jwt):
		headers = makeAuthHeaders(jwt)
		payload = ""
		conn = http.client.HTTPSConnection(url)
		conn.request("GET", api+resource, payload, headers)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		return data	

#--------------------------------------- Tests are here -----------------------------------------------------------
print("running tests")

username=adminLogin
password=adminPassword
url = "dev.talkisbetter.com"
api="/devapi/"

testpass=0;
errorsFound = 0;

login=Login()
loginResponse = str(login.login(url,api,username,password),"utf-8")
loginResponseObject = json.loads(loginResponse)
jwt = loginResponseObject["token"]

# ========================================= BLOG ENDPOINT TEST ============================================================================
crudl=CRUDL()
resource="blogs"
# CREATE TEST
result = str(crudl.create(url,api,resource,jwt,"{\"storyName\":\"test\",\"storyText\":\"teststory\",\"date\":\"testDate\"}"),"utf-8")
resultObject = json.loads(result)

if resultObject["storyName"]=="test" and resultObject["storyText"]=="teststory" and resultObject["date"]=="testDate":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to create blog")
blogId=resultObject["_id"]

#READ TEST
result = str(crudl.read(url,api,resource,jwt,blogId),"utf-8")
resultObject = json.loads(result)

if resultObject["storyName"]=="test" and resultObject["storyText"]=="teststory" and resultObject["date"]=="testDate":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to read blog")

#UPDATE TEST
result = str(crudl.update(url,api,resource,jwt,blogId,"{\"storyName\":\"test1\",\"storyText\":\"teststory1\",\"date\":\"testDate1\"}"),"utf-8")
resultObject = json.loads(result)

if resultObject["storyName"]=="test1" and resultObject["storyText"]=="teststory1" and resultObject["date"]=="testDate1":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to update blog")

#DELETE TEST
result = str(crudl.delete(url,api,resource,jwt,blogId),"utf-8")
resultObject = json.loads(result)

if resultObject["message"]=="Blog deleted!!":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to delete blog")



#LIST TEST (just checks for Error)

# ========================================= PROJECT ENDPOINT TEST ============================================================================
crudl=CRUDL()
resource="projects"
# CREATE TEST
result = str(crudl.create(url,api,resource,jwt,"{\"title\":\"test\",\"description\":\"teststory\",\"year\":\"testDate\"}"),"utf-8")
resultObject = json.loads(result)

if resultObject["title"]=="test" and resultObject["description"]=="teststory" and resultObject["year"]=="testDate":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to create " + resource)
Id=resultObject["_id"]

#READ TEST
result = str(crudl.read(url,api,resource,jwt,Id),"utf-8")
resultObject = json.loads(result)

if resultObject["title"]=="test" and resultObject["description"]=="teststory" and resultObject["year"]=="testDate":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to read "+resource)

#UPDATE TEST
result = str(crudl.update(url,api,resource,jwt,Id,"{\"title\":\"test1\",\"description\":\"teststory1\",\"year\":\"testDate1\"}"),"utf-8")
resultObject = json.loads(result)

if resultObject["title"]=="test1" and resultObject["description"]=="teststory1" and resultObject["year"]=="testDate1":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to update "+resource)

#DELETE TEST
result = str(crudl.delete(url,api,resource,jwt,Id),"utf-8")
resultObject = json.loads(result)

if resultObject["message"]=="Project deleted!!":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to delete "+resource)



#LIST TEST (just checks for Error)

# ========================================= TASK ENDPOINT TEST ============================================================================
crudl=CRUDL()
resource="tasks"
# CREATE TEST
result = str(crudl.create(url,api,resource,jwt,"{\"storyName\":\"test\",\"storyText\":\"teststory\",\"date\":\"testDate\"}"),"utf-8")
resultObject = json.loads(result)

if resultObject["storyName"]=="test" and resultObject["storyText"]=="teststory" and resultObject["date"]=="testDate":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to create "+resource)
blogId=resultObject["_id"]

#READ TEST
result = str(crudl.read(url,api,resource,jwt,blogId),"utf-8")
resultObject = json.loads(result)

if resultObject["storyName"]=="test" and resultObject["storyText"]=="teststory" and resultObject["date"]=="testDate":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to read "+resource)

#UPDATE TEST
result = str(crudl.update(url,api,resource,jwt,blogId,"{\"storyName\":\"test1\",\"storyText\":\"teststory1\",\"date\":\"testDate1\"}"),"utf-8")
resultObject = json.loads(result)

if resultObject["storyName"]=="test1" and resultObject["storyText"]=="teststory1" and resultObject["date"]=="testDate1":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to update "+resource)

#DELETE TEST
result = str(crudl.delete(url,api,resource,jwt,blogId),"utf-8")
resultObject = json.loads(result)

if resultObject["message"]=="Task deleted!!":
	testpass = testpass+1
else:
	errorsFound=errorsFound+1
	print("failed to delete "+resource)



#LIST TEST (just checks for Error)




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

print("Errors found: " + str(errorsFound))
print("Tests passed:" + str(testpass))

