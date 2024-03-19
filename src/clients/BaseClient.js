const sendRequest = async (path, options) => {
  console.log(`Sending request to: ${path}...`);
  let response = {status: 500, errors: []}
  try {
    const request = await fetch(path, options);
    const json = await request.json();
    
    response.status = request.status;
    console.log(json)
    if (request.status === 200) {
      response.body = json;
    }

    else {
      response.errors = json.errors;
    }
  } catch(error) {
    console.error(error);
    response.errors.push('Oh no! Something unexpected occured!')
  }
  console.log('returning response', response)
  return response;
}

export default sendRequest;