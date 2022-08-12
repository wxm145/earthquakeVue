let apiFun={};
 
//查询列表
apiFun.getlist=function(params){
    return this.$get('/getMark',params)
}

//导入
apiFun.importspecialInfo=function(file){
 const formData = new FormData();
 formData.append('file', file);
 return this.$postform({
    url: '/uploadFile',
    data: formData,
 })

}






export default apiFun