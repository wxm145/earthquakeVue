<template>
  <div>
    <div class="block" style="
        position: absolute;
        z-index: 99;
        background-color: #fff;
        opacity: 0.9;
        width: 100%;
      ">
      <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <span>Date：</span>
          <el-date-picker v-model="date" type="daterange" range-separator="--" value-format="yyyy-MM-dd"
            start-placeholder="startDate" end-placeholder="endDate">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="nation">
          <el-select v-model="formInline.nation" clearable filterable placeholder="please select">
            <el-option v-for="item in nations" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="type">
          <el-select v-model="formInline.type" clearable filterable placeholder="please select">
            <el-option key="Earthquake" label="Earthquake" value="Earthquake"></el-option>
            <el-option key="Explosion" label="Explosion" value="Explosion"></el-option>
            <el-option key="Rock Burst" label="Rock Burst" value="Rock Burst"></el-option>
            <el-option key="Nuclear Explosion" label="Nuclear Explosion" value="Nuclear Explosion"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="depth">
          <el-input v-model="formInline.depth" clearable placeholder="please input depth"></el-input>
        </el-form-item>
        <el-form-item label="magnitude">
          <el-input v-model="formInline.magnitude" clearable placeholder="please input magnitude"></el-input>
        </el-form-item>



        <el-form-item>
          <el-button type="primary" @click="search">search</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload class="elUpload" :http-request="uploadFile" :show-file-list="false" :file-list="fileList"
            ref="uploadForm" :limit="1">
            <el-button type="primary">import</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import iconPaht from "@/assets/dir-via-marker.png";
import greeniconPaht from "@/assets/green.png";
import yellowIconPaht from "@/assets/yellow.png";
import redIconPaht from "@/assets/red.png";


import close from "@/assets/close2.gif";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      map: null,
      infoWindow: null,
      date: [],

      fileList: [],

      nations: [],
      formInline: {
        date: "",
        longitude: "",
        latitude: "",
        earthquaketype: "",
        depth: "",
        magnitude: "",
        nation: "",
        loading: null,
      },
    };
  },
  mounted() {
    var that = this;
    this.getNation();
    this.initMap();
  },

  methods: {
    getNation() {
      this.$get("/earthquake/getNation", {}).then((res) => {
        this.nations = res.data;
      })
    },
    initMap() {
      var that = this;
      that.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      AMapLoader.load({
        key: "55e9125e95d66982576a44c066295502",
        version: "1.4.15",
        plugins: ["AMap.Scale"],
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            zoom: 1, 
            lang: "en",
            resizeEnable: true,
            center: [116.35, 39.89], 
          });

          this.addmark();
        })
        .catch((e) => {
          that.loading.close()
          console.log(e);
        });
    },


    addmark() {
      this.getlist();
    },

    getlist() {
      var that = this;
      this.$get("/earthquake/getMark", this.formInline).then((res) => {
        var marks = [];
        var styleObj = [];
        debugger
        that.map.setZoomAndCenter(1, [res.data[0].longitude, res.data[0].latitude]);
        for (var i = 0; i < res.data.length; i++) {
          var data = {
            lnglat: [res.data[i].longitude, res.data[i].latitude],
            id: i,
            date: res.data[i].date,
            nation: res.data[i].nation,
            style: i
          };
          marks.push(data);
          var url = "";
          if (res.data[i].magnitude < 6) {
            url = greeniconPaht;
          } else if (res.data[i].magnitude >= 6 && res.data[i].magnitude < 7) {
            url = yellowIconPaht;
          } else if (res.data[i].magnitude > 7) {
            url = redIconPaht;
          }

          var style = {
            url: url,
            anchor: new AMap.Pixel(12, 24),
            size: new AMap.Size(24, 24),
            zIndex: i
          };

          styleObj.push(style)
        }


        var massMarks = new AMap.MassMarks(marks, {
          zIndex: 5,
          zooms: [3, 19],
          cursor: 'pointer',
          style: styleObj,
        });

        massMarks.setMap(that.map);

        massMarks.on("click", function (e) {
          debugger
          var title =
            '<div style="font-size:11px;width:150px;">' +
            e.data.date + '/' + e.data.nation +
            "</div>",

            content = [];
          content.push(
            '<div style="font-size:11px;width:150px">' + e.data.lnglat.lng + "</div>"
          );
          content.push(
            '<div style="font-size:11px;width:150px">' + e.data.lnglat.lat + "</div>"
          );

          var infoWindow = new AMap.InfoWindow({
            isCustom: true,
            content: that.createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45),
          });

          infoWindow.open(that.map, [e.data.lnglat.lng, e.data.lnglat.lat]);
        });
        that.loading.close()
      }).catch(err => {
        that.loading.close()
      });
    },

    search() {
      this.formInline.date = this.date + "";
      this.initMap();
    },
    uploadFile(param) {
      debugger
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.importExcel(param.file);
    },
    importExcel(file) {
      var that = this;
      const formData = new FormData();
      formData.append("file", file);
      this.$postform("/earthquake/uploadFile", formData).then((res) => {
        debugger
        this.fileList = [];
        if (res.code == "0") {
          that.loading.close();
          that.$message({
            message: "Import success",
            type: "success",
          });
          that.initMap();
          that.getNation();

        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }).catch(err => {
         that.$message({
            message: "Import error",
            type: "error",
          });
        this.fileList = [];
        that.loading.close();
      });
    },

    //create windows
    createInfoWindow(title, content) {
      var that = this;
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";
      //info.style.width = "400px";
      // top titel
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = close;
      closeX.onclick = function () {
        that.closeInfoWindow();
      };

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // coneng
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // bottom
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      info.appendChild(bottom);
      return info;
    },
    //close windows
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
  },
};
</script>


<style   >
.amap-logo {
  display: none;
  opacity: 0 !important;
}

.amap-copyright {
  opacity: 0;
}

#container {
  width: 100%;
  height: 900px;
}

.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

span {
  margin-left: 5px;
  font-size: 11px;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}
</style>

