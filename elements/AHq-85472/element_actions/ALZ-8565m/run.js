function(instance, properties, context) {


if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
} else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
}
    
const run = async () => {
    
    provider.send("eth_requestAccounts", [0])
    var signer = await provider.getSigner(0);
    var sdk = await new ThirdwebSDK.ThirdwebSDK(signer);
 
    const contract = sdk.getNFTDrop(properties.nft_drop_contract_address);

    const metadatas = JSON.parse(properties.metadatas)
    
  try {   
    
    const results = await contract.createBatch(metadatas); 
    const firstTokenId = results[0].id; 
    console.log (results);
      
    console.log("NFT metadata created, beginning at token ID: "+firstTokenId)
    const txstring = JSON.stringify(results);
    instance.publishState('nft_drop_uploaded_metadata', txstring);
    instance.triggerEvent('nft_drop_metadata_uploaded')
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('nft_drop_metadata_upload_error', errorcode);
    instance.triggerEvent('nft_drop_metadata_upload_error');
  }

}

run()

}