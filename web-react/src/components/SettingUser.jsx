import React,{Component} from 'react'
import axios from 'axios'

export default class SettingUser extends Component {
    constructor(props){
        super(props)
        this.state ={
        id:'',
        fname: '',
        lname: '',
        name:'',
        email: '',
        password:'',
        comfirmpassword: ''
        }
        this.clearForm=this.clearForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    componentDidMount() {
        const exist =localStorage.getItem('myData')
        if(exist!=null) {
            const url ='http://localhost:5000/api/v3/users/me'
            axios.get(url,{
                headers:{
                    'Authorization': `Bearer ${exist}`
                }
            })
            .then(res =>{
                console.log(res);
                console.log(res.data);
                this.setState({
                    name:res.data.user.name,
                    fname:res.data.user.fname,
                    lname:res.data.user.lname,
                    email:res.data.user.email,
                    id:res.data.user._id
                })
            })
        }
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    clearForm = () =>{
        this.setState( {
            name:'',
            fname:'',
            lname:''
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const exist =localStorage.getItem('myData')
        if(exist!=null && this.state.comfirmpassword===this.state.password) {
         axios.put('http://localhost:5000/api/v3/users/edit/'+ this.state.id,{
            fname:this.state.fname,
            lname:this.state.lname,
            name:this.state.name,
            password:this.state.password,
         },{
                headers:{
                    'Authorization': `Bearer ${exist}`
                }
            }
            ).then(res=>{
                console.log(res);
                console.log(res.data);
                alert("Update successful")
                window.location.reload(false) 
            })
            }else window.alert('Password Not Same!!!')
        }

render(){
  return (
    <div className="container mt-4 mb-5">
    <label className="label">Profile</label>
        <div className="columns is-centered">
            <div className="column is-half">
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="form-control" onChange={this.onChange} type="text" name="fname" value={this.state.fname} />
                        </div>
                    </div> <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="form-control" onChange={this.onChange} type="text" name="lname"  value={this.state.lname}/>
                        </div>
                    </div>
                 <div className="field">
                        <label className="label">User Name</label>
                        <div className="control">
                            <input className="form-control" onChange={this.onChange} type="text" name="name"  value={this.state.name}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="form-control" type="email"  name="email" value={this.state.email} readonly="readonly"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input className="form-control" onChange={this.onChange} type="password" name="password" value={this.state.password}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Comfirm Password
                        </label>
                        <div className="control">
                            <input className="form-control" onChange={this.onChange} type="password" name="comfirmpassword" value={this.state.comfirmpassword}/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                        <input type="button" value="Default"className="button is-danger is-focused" onClick={this.clearForm}/>
                        </div>
                        <div className="control">
                        <input type="submit" value="Save" className="button is-success is-focused"/>               
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div> 
  )
}
}
