// 学生相关页面的二级路由
 
import  apply  from  '../pages/student/student-index.vue'
import  clock  from  '../pages/student/clock-list.vue'
import myHomework from '../pages/student/myHomework.vue'
import classtimeDetail from '../pages/student/classtimeDetail.vue'
import homeworkDetails from '../pages/student/homeworkDetails.vue'
 


export default [
    {
        title : '我的课表',
        name : 'students',
        path : 'students',
        component : apply,
         
    },
    {
                
        name: 'classtime',
        path: 'classtime',
        component: classtimeDetail
        
    },
    {
        title : '我的作业',
        name : 'myHomework',
        path : 'myHomework',
        component : myHomework,
        
       
    },
    {
               
        name: 'homeworkDetails',
        path: 'homeworkDetails',
        component: homeworkDetails

    },
    
    {
        title : '我的考勤',
        name : 'clock',
        path : 'clock',
        component : clock
    },
   
    
]

   
