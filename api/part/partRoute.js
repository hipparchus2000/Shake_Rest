module.exports = (app) => {
	let $1List = require('./$1Controller');
	app.route('/$1s')
		.get($1List.get$capitialisedInitialVersions) 
		.post($1List.create$capitialisedInitialVersion);
	app.route('/$1s/:$1Id')
		.get($1List.read$capitialisedInitialVersion)
		.put($1List.update$capitialisedInitialVersion)
		.delete($1List.delete$capitialisedInitialVersion);
}


