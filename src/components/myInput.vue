<template>
  <div class="col-3 input-effect">
    <input :class="{'has-content':value!=='','effect-19':true}" :type="type" placeholder="" :value="value" @input="$emit('input',$event.target.value)">
    <label>{{placeholder}}</label>
    <span class="focus-border">
		            	<i></i>
		            </span>
  </div>
</template>
<script>
export default {
  name: "myInput",
  props:{
    value:'',
    placeholder:'',
    type : '',
  }
}
</script>

<style scoped lang="less">
.col-3 {

}

input[type="text"],input[type="password"] {
  font: 15px/24px "Lato", Arial, sans-serif;
  color: #333;
  //width: 100%;
  min-width: 270px;
  min-height: 40px;
  box-sizing: border-box;
  letter-spacing: 1px;
  outline:0;
  border-radius: 5px;
}

.effect-19 {
  border: 1px solid #ccc;
  padding: 7px 14px;
  transition: 0.4s;
  background: transparent;
}
.effect-19:focus,
.has-content.effect-19
{
  border: 0;
}

.effect-19 ~ .focus-border:before,
.effect-19 ~ .focus-border:after {
  content: "";
  position: absolute;
  top: -1px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #3399FF;
  transition: 0.4s;
}

.effect-19 ~ .focus-border:after {
  top: auto;
  bottom: 0;
}

.effect-19 ~ .focus-border i:before,
.effect-19 ~ .focus-border i:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 2px;
  height: 0;
  background-color: #3399FF;
  transition: 0.6s;
}

.effect-19 ~ .focus-border i:after {
  left: 268px;
  right: 0;
}

.effect-19:focus ~ .focus-border:before,
.effect-19:focus ~ .focus-border:after,
.has-content.effect-19 ~ .focus-border:before,
.has-content.effect-19 ~ .focus-border:after {
  left: 0;
  width: 270px;
  transition: 0.4s;
  z-index:-100;
}

.effect-19:focus ~ .focus-border i:before,
.effect-19:focus ~ .focus-border i:after,
.has-content.effect-19 ~ .focus-border i:before,
.has-content.effect-19 ~ .focus-border i:after {
  top: -1px;
  height: 100%;
  transition: 0.6s;
  outline:0;
}

.effect-19 ~ label {
  position: absolute;
  left: 6px;
  width: auto;
  top: 0;
  color: #aaa;
  transition: 0.3s;
  z-index: -1;
  letter-spacing: 0.5px;
  background: rgb(241,252,253);
  padding: 0 12px 0 12px;
}

.effect-19:focus ~ label, .has-content.effect-19 ~ label {
  top: -20px;
  left: 14px;
  font-size: 12px;
  color: #3399FF;
  transition: 0.3s;
}
</style>