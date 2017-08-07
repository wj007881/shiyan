
import test from 'ava'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

test('API vote', async t => {
  let res1=await axios.get('/db/users',{params:{limit:1}})
  let res2=await axios.get('/db/artworks',{params:{limit:1}})
  let userId=res1.data[0]._id
  let artworkId=res2.data[0]._id
  let data={userId,artworkId}
  //console.log(data)
  let res=await axios.post('/api/vote',data)
  t.true(res.data.success)
  res=await axios.post('/api/published',{
       likeNum:1,
       page:1,
       limit:5
  })
  t.true(res.data.success)
  let result=res.data.result
  for (let i=0;i<result.length;i++)
     console.log(JSON.stringify(result[i]))
})
