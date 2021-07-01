import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      name: '',
      college_courses: [],
      course_name:'',
      course_code:''
    }
  }

 async getOptions(){
    const res = await axios.get('https://rocky-depths-80035.herokuapp.com/college/colleges')
    const data = res.data

    const options = data.map(d => ({
      "label" : d.name
    }))

    this.setState({selectOptions: options})

  }

  async getcollegeCourses(collegeID){
      const res = await axios.get('https://rocky-depths-80035.herokuapp.com/college/' + collegeID)
      const data = res.data
      const courses = data.map(d => ({
         "value" : d.course_name,
         "label" : d.course_code
      }))

      this.setState({college_courses: courses})
    }

  handleChange(e){
   this.setState({name:e.label})
   this.getcollegeCourses(e.label)
  }

  handleCourseChange(e){
  this.setState({course_name:e.value})
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    console.log(this.state.selectOptions)
    console.log(this.state.college_courses)
    return (
     <>
      <div>
        <Select className="dropdown" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    <p>You have selected College: <strong>{this.state.name}</strong></p>
      </div>
      <div>
       <Select className="dropdown" options={this.state.college_courses} onChange={this.handleCourseChange.bind(this)}/>
       <p>You have selected Course: <strong>{this.state.course_name}</strong></p>
       </div>
       </>
    )
  }
}