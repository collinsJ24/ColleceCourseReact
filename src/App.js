import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      course_code: '',
      course_name: ''
    }
  }

 async getOptions(){
    const res = await axios.get('https://rocky-depths-80035.herokuapp.com/college/DCU')
    const data = res.data

    const options = data.map(d => ({
      "value" : d.course_name,
      "label" : d.course_code

    }))

    this.setState({selectOptions: options})

  }

  async getOptions2(requestVar){
      const res = await axios.get('https://rocky-depths-80035.herokuapp.com/college/' + requestVar)
      const data = res.data

      const options = data.map(d => ({
        "value" : d.email,
        "label" : d.userId

      }))

      this.setState({selectOptions: options})

    }

  handleChange(e){
   this.setState({course_code:e.value, course_name:e.label})
   this.getOptions2("test")
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    console.log(this.state.selectOptions)
    return (
      <div >
        <Select className="dropdown" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    <p>You have selected <strong>{this.state.course_code}</strong> whose id is <strong>{this.state.course_name}</strong></p>
      </div>
    )
  }
}