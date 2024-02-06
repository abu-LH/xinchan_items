/**
 * 管理员角色服务接口
 */

let db = require('../common/db')
let connection = db.getConnection()

module.exports = {
    // 查询待加入用户
    async usersAudit(){
        let status = '审核中'
        let sql = "select * from users where status='审核中'"
        let result = await db.query(sql,status)
        return result
    },
    // 查询已加入用户
    async normalUsers(schoolId){
        let sql = "select * from users where status='正常' and schoolId=?"
        let result = await db.query(sql,[schoolId - 0]) 
        return result
    },

    // 用户信息更新
    async updateUser(newData){
        let username = newData[0].username
        let name = newData[0].name
        let phone = newData[0].phone
        let email = newData[0].email
        let id = newData[0].id
        let identityNo = newData[0].identityNo
        let sql = "update users set username=?, name=?, phone=?, email=?, identityNo=? where id=?"
        let result = await db.query(sql,[username, name, phone, email, identityNo, id - 0]) 
        return result
    },  
    
    // 移除已加入的用户
    async deleteUsers(oldData){
        let name = oldData[0].name
        let id = oldData[0].id
        let sql = "update users set schoolId=0 where id=? and name=?"
        let result = await db.query(sql,[id - 0, name]) 
        return result
    },  

    // 同意申请
    async agreeApply(Id){
        let status= '正常'
        let sql = "update users set status=? where Id=? and status='审核中'"
        let result = await db.query(sql,[status,Id - 0])
        return result
    },

    // 拒绝申请
    async refuseApply(Id){
        let status = '拒绝'
        let sql = "update users set status=? where Id=? and status='审核中'"
        let result = await db.query(sql,[status,Id - 0])
        return result
    },

    // 查询课程
    async getCourses(schoolId) {
        let sql = 'select * from courses where schoolId=?'
        return await db.query(sql,[schoolId - 0])
    },

    // 添加课程
    async addCourse(newData){
        let schoolId = newData[0].schoolId
        let name = newData[0].name
        let sql = "insert into courses (schoolId, name) value (?, ?)"
        let result = await db.query(sql, [schoolId - 0, name]) 
        return result
    }, 

    // 更新课程
    async updateCourse(newData){
        let name = newData[0].name
        let id = newData[0].id
        let sql = "update courses set name=? where id=?"
        let result = await db.query(sql, [name, id - 0]) 
        return result
    }, 

    // 返回新课程id
    async getNewCourses(newData) {
        let name = newData.newCourse
        let schoolId = newData.schoolId
        let sql = 'select * from courses where schoolId=? and name=?'
        return await db.query(sql,[schoolId - 0, name])
    },

    // 删除课程
    async deleteCourse(oldCourse){
        let id = oldCourse[0].id
        let schoolId = oldCourse[0].schoolId
        let sql = "delete from courses where schoolId=? and id=?"
        let result = await db.query(sql, [schoolId - 0, id - 0]) 
        return result
    }, 

    // 更新班级课程（移除）
    async deleteClassCourse(newData){
        let courseId = newData[0].courseId
        let sql = 'update classes set courseId=0 where courseId=?'
        let result = await db.query(sql, [courseId]) 
        return result
    },

    // 更新班级课程（添加）
    async updateClassCourse(newData){
        let courseId = newData[0].courseId
        let ids = newData[0].classes
        let id = ''
        let sql = 'update classes set courseId=? where id in ('
        for(let i of ids){
            id += ( i + ', ' )
        }
        id = id.substring(0, id.length - 2)
        sql += ( id + ')' )
        let result = await db.query(sql, [courseId]) 
        return result
    }, 

    // 查询班级信息
    async getClasses(schoolId) {
        let sql = 'select * from classes where schoolId=?'
        return await db.query(sql, [schoolId - 0])
    },

    // 查询班级内用户
    async getClassesUsers(schoolId) {
        let sql = 'select classes.*, classes_users.* from classes join classes_users on classes_users.classId=classes.id where classes.schoolId=?'
        return await db.query(sql, [schoolId - 0])
    },

    // 新增班级
    async addClass(newData){
        let schoolId = newData[0].schoolId
        let name = newData[0].name
        let courseId = 0
        let teacher = ''
        if(newData[0].teacher - 0 != 0){
            teacher = newData[0].teacher - 0
        }
        let students = ''
        students += newData[0].students.join('|')
        let sql = "insert into classes (schoolId, name, courseId, teacherIds, studentIds) value (?, ?, ?, ?, ?)"
        let result = await db.query(sql, [schoolId - 0, name, courseId - 0, teacher - 0, students]) 
        return result
    }, 

    // 返回新班级id
    async getNewClass(newData) {
        let name = newData.newClass
        let schoolId = newData.schoolId
        let sql = 'select * from classes where schoolId=? and name=?'
        return await db.query(sql,[schoolId - 0, name])
    },

    // 删除班级
    async deleteClass(oldClassId){
        connection.beginTransaction(function(err){
            if(err){throw err;}
            connection.query('delete from classes_users where classId=?',oldClassId - 0,function(error,results,fields){
                if(error){
                    return connection.rollback(function(){throw error;})
                }
            
                connection.query('delete from classes where id=?',oldClassId - 0,function(error,results,fields){
                    if(error){
                        return connection.rollback(function(){throw error;});
                    }
            
                    connection.commit(function(err){
                        if(err){
                            return connection.rollback(function(){throw err;});
                        }
                    });
                });
            });
        });
    },

    // 添加班级用户关系
    async addClassesUsers(newData){
        let classId = newData[0].classId
        let usersId = newData[0].users
        let isTeacher = newData[0].isTeacher
        let sql = "insert into classes_users (classId, userId, isTeacher) values"
        for(let i of usersId){
            sql += ( ' (' + (classId - 0) + ', ' + i + ', ' + (isTeacher - 0) + '),' )
        }
        sql = sql.substring(0, sql.length - 1)
        let result = await db.query(sql, []) 
        return result
    }, 

    // 更新班级信息
    async updateClasses(newData){
        let id = newData[0].classId
        let courseId = newData[0].newCourseId
        let name = newData[0].name
        let teacher = ''
        if(newData[0].teacher - 0 != 0){
            teacher = newData[0].teacher - 0
        }
        let students = ''
        students += newData[0].students.join('|')
        let sql = "update classes set name=?, courseId=?, teacherIds=?, studentIds=? where id=?"
        let result = await db.query(sql, [name, courseId - 0, teacher , students, id - 0])
    },

    // 更新班级用户关系表
    async updateClassesUsers(newData){
        let users = newData[0].users
        let classId = newData[0].classId
        for(let i = users.length - 1; i >= 0; i--){
            if(users[i].id - 0 == 0){
                users.splice(i, 1)
            }
        }

        connection.beginTransaction(function(err){
            if(err){throw err;}

            connection.query('delete from classes_users where classId=?',classId - 0,function(error,results,fields){
                if(error){
                    return connection.rollback(function(){throw error;})
                }

                if(users.length > 0){
                    let sql = 'insert into classes_users (classId, userId, isTeacher) values'
                    for(let i of users){
                        sql += ( ' (' + (classId - 0) + ', ' + (i.id - 0) + ', ' + (i.isTeacher - 0) + '),' )
                    }
                    sql = sql.substring(0, sql.length - 1);
                
                    connection.query(sql,[],function(error,results,fields){
                        if(error){
                            return connection.rollback(function(){throw error;})
                        }
                    })
                }

                connection.commit(function(err){
                    if(err){
                        return connection.rollback(function(){throw err;});
                    }
                })
            })
        })
    },

    // 查询机构位置经纬度
    async getLocation(schoolId) {
        let sql = 'select * from schools where id=?'
        return await db.query(sql,[schoolId - 0])
    },

    // 修改机构位置经纬度
    async updateLocation(newData){
        let id = newData[0].id
        let lat = newData[0].lat
        let long = newData[0].long
        let sql = "update schools set latitude=?, longitude=? where id=?"
        let result = await db.query(sql, [lat - 0, long - 0, id - 0]) 
        return result
    }, 
}

