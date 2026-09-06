'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function BookingPage() {
  const [form, setForm] = useState({
    name:'',
    phone:'',
    booking_date:'',
    note:''
  })
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    setMsg('')
    const {error}=await supabase.from('booking').insert([form])
    if(error){
      setMsg('提交失敗：'+error.message)
    }else{
      setMsg('✅預約提交成功！')
      setForm({name:'',phone:'',booking_date:'',note:''})
    }
  }

  return (
    <div>
      <h1>預約登記</h1>
      {msg&&<p style={{marginBottom:16}}>{msg}</p>}
      <form onSubmit={submit}>
        <div>
          <label>姓名</label>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        </div>
        <div>
          <label>聯絡電話</label>
          <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/>
        </div>
        <div>
          <label>預約日期</label>
          <input type="date" value={form.booking_date} onChange={e=>setForm({...form,booking_date:e.target.value})} required/>
        </div>
        <div>
          <label>備註</label>
          <textarea value={form.note} onChange={e=>setForm({...form,note:e.target.value})}/>
        </div>
        <button type="submit">提交預約</button>
      </form>
    </div>
  )
}
