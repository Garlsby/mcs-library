import React from 'react'
import axios from 'axios'

const getData = async (url) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${url}`, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("token") 
      }
    })
    return response.data
  }catch (error) {
    throw error
  }
}

const deleteData = async (url) => {
  try{
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}${url}`,{
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      }
    })

    return response.data
  }catch(error) {
    console.error(error)
  }
}

const updateData = async (url,data) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}${url}`, data, {
      headers: {
        'Authorization' : "Bearer " + localStorage.getItem("token")
      },

    })
    return response
  }catch(error){
    console.error(error)
  }
}

const addData = async (url,data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${url}`, data, {
      headers: {
        'Authorization' : "Bearer " + localStorage.getItem("token")
      },

    })
    return response
  }catch(error){
    console.error(error)
  }
}

export const returnBookFromUser = async (id) => {
  const url = `/return-book?bookId=${id}`
  try {
    const response = await updateData(url)
    return response
  } catch(error) {
    console.error(error)
  }
}

export const borrowBook = async (bookId, userId) => {
  const url = `/update-book?bookId=${bookId}&studentId=${userId}`
  try{
    const response = await updateData(url,{})
    return response
  }catch(error) {
    console.log(error)
  }
}

export const postData = async (category,data) => {
  const addDatas = {
    student: "create-student",
    book: "add-book"
  }
  const url = `/${addDatas[category]}`
  try{
    const result = await addData(url,data)
    return result
  }catch(error) {
    console.error(error)
  }
}

export const getCategoryData = async (type,setData) => {
  const url = `/${type}s`
  try{
    const data = await getData(url)
    return data
  } catch(error){
    console.error(error)
  }
}

export const getDataByName = async (type,name) => {
  const url = `/${type}?name=${name}`
  try {
    const data = await getData(url)
    return data
  }catch(error){
    console.error(error)
  }
}

export const getDataById = async (type,id) => {
  const url = `/${type}/${id}`
  try {
    const data = await getData(url)
    return data
  }catch(error){
    console.error(error)
  }
}

export const deleteDataById = async (id, type) => {
  const url = `/delete-${type}?${type}Id=${id}`
  try{
    const result = await deleteData(url)
    return result
  }catch(error) {
    console.error(error)
  }
}

export const editData = async(id,type, data) => {
  const url = `/update-${type}?${type}Id=${id}`
  try {
    const result = await updateData(url,data)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const validateToken = async() => {
  const url = '/token-validation'
  try {
    const response = await getData(url)
    return response
  }catch(error) {
    console.error(error)
  }
}