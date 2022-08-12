
configureWebpack: {
    name: "test";
    externals: {
      AMap: "AMap";
      AMapUI:"AMapUI";
    }

  }

  module.exports={
    devServer:{
      proxy:{
        "/dev":{
          target:"http://localhost:8080/earthquake",
          changeOrigin:true,
          pathRewrite:{
            "^/dev":""
          },
          
        },
      },
      disableHostCheck: true
    },
  }