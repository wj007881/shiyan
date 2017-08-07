
import test from 'ava'
import axios from 'axios'
const User = require('../models/user')

axios.defaults.baseURL = 'http://localhost:3000'
test('user fullName', async t => {
   let u=new User({code:'demo',displayName:'ABC',password:'1234'})
    t.is(u.fullName,'demo-ABC')
    console.log(JSON.stringify(u))
})

test('comm load', async t => {
  let res=await axios.get('/db/artworks',{
    params:{
       limit:10,
       skip:10,
       conditions:{
          isPublic: true
       }
    }
  })

  let data=res.data
   t.is(data.length,10)
 // console.log(JSON.stringify(data[0]))
})

test('API load', async t => {
  let res=await axios.post('/api/published',{
       name:'5',
       limit:10
      // ,category:'592ff7b174778e16402f6de8'
      // ,tags:'592ff7b174778e16402f6ddc,592ff7b174778e16402f6de0'
      })
  t.true(res.data.success)
  t.true(res.data.allPage>=1)
  let result=res.data.result
  for (let i=0;i<result.length;i++)
     console.log(JSON.stringify(result[i]))
})
