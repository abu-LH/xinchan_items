<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="school">{{ location.name }}</div>
            </el-header>

            <el-main>
                <div class="map">
                    用于显示地图的位置<br>
                    当前经度：{{ location.lat }}<br>
                    当前纬度：{{ location.long }}
                </div>
            </el-main>

            <el-footer>

                请输入新位置的经度：<el-input v-model="newLocation.lat" class="inf"/><br>
                请输入新位置的纬度：<el-input v-model="newLocation.long" class="inf"/><br>

                <el-button plain @click="updateLocation">确认</el-button>

            </el-footer>
        </el-container>
    </div>


</template>

<script setup>
import { ref, h, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import useGlobal from '../../utils/useGlobal'
import { forEach } from 'lodash';

const global = useGlobal()

let schoolId = global.data.me.schoolId


let location = ref({
    name: '',
    lat: 0,
    long: 0
})

async function getLocation() {
    let getLocation = (await global.axios.get('/admin/getLocation',
        { params: { schoolId: schoolId } }))
    location.value.name = getLocation[0].name
    location.value.lat = getLocation[0].latitude
    location.value.long = getLocation[0].longitude
}
getLocation()

let newLocation = ref({
    lat: 0,
    long: 0
})


async function updateLocation(){
    let updateLocation = await global.axios.post('/admin/updateLocation', {
        newData: [{
            id: schoolId,
            lat: newLocation.value.lat,
            long: newLocation.value.long
        }]
    })

    location.value.lat = newLocation.value.lat
    location.value.long = newLocation.value.long
}

</script>

<style scoped>
    .map{
        background-color: #EEE;
        margin-left: 20%;
        margin-right: 20%;
    }

    .school{
        font-size: 1.5rem;
    }

    .inf{
        width: 5rem;
    }

</style>