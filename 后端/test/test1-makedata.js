
import test from 'ava'
import axios from 'axios'
import {Tag,Category,Artwork} from '../models'
const initdb = require('../models/initdb')
/*
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
*/
axios.defaults.baseURL = 'http://localhost:3000'


test('make demo data', async t => {
  await initdb()
  await Artwork.remove({})
  console.log('artworks removed')
  await Tag.remove({})
  console.log('tags removed') 
  await Category({})
  console.log('categores removed') 
  
  let res=await axios.post('/login', {
    code: 'admin',
    password: '12345'
  })
  console.log(res.data)
  t.true(res.data.success)
  axios.defaults.headers.common['Authorization'] =res.data.token
  let tags=[]
  let cats=[]
  for (let i=1;i<11;i++){
    res=await axios.post('/db/tags', { name: 'TAG-'+i})
    tags.push(res.data)
    let size=tags.length-1
   // t.is(res.data.status,'success')
   // console.log(tags[size])
  }
  for (let i=1;i<6;i++){
    res=await axios.post('/db/categorys', { name: 'category-'+i})
    cats.push(res.data)
    let size=cats.length-1
    //t.is(res.data.status,'success')
    //console.log(cats[size])
  }
  for (let i=1;i<101;i++){
    let t1=Math.floor(Math.random()*9)
    let t2=Math.floor(Math.random()*9)
    let cat=Math.floor(Math.random()*4)
    res=await axios.post('/db/artworks', {
       name: 'artwork-'+i,
       category:cats[cat]._id,
       tags:[tags[t1]._id,tags[t2]._id]
    })
   // t.is(res.data.status,'success')
   if (i%10==0)
      console.log(res.data)
  }
 
   
})

