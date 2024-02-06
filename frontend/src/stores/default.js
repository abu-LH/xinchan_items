import { defineStore } from 'pinia'
 
export const useStore = defineStore('default', {
    state: () => ({
        me:null,
        currentClassId:0,
    }),
    persist:{
      storage: localStorage,
    },
    getters:  {

      }  ,
  
    actions: {
      } 
})

