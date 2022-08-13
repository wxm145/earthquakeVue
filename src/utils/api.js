let apiFun={};
 
apiFun.getlist=function(params){
    return this.$get('/getMark',params)
}

apiFun.importspecialInfo=function(file){
 const formData = new FormData();
 formData.append('file', file);
 return this.$postform({
    url: '/uploadFile',
    data: formData,
 })

}






export default apiFun