import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,SafeAreaView,Platform,StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { RFValue } from "react-native-responsive-fontsize";
import db from './config'
import firebase from "firebase"
export default class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      quote: '',
      name:'',
      email:firebase.auth().currentUser.email,
      orders:[],
    };
  }
  componentDidMount() {
    this.fetchQuotes();
    this.getUserDetails27();
    this.fetchOrders();
 
}
  getUserDetails27 = () => {
    db.collection("usersAdmin")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({name : doc.data().name})
          
        })
    });}


  

  fetchQuotes() {
    var category = 'happiness';
    fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, {
      method: 'GET',
      headers: {
        'X-Api-Key': '+eMhjEwCuniwQ3t6APkwHQ==xgXgfgCU5n0yJDWO',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { author, quote } = data[0];
          this.setState({ author, quote });
        } else {
          console.error('No quotes found.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  openDrawer1 = () => {
    this.props.navigation.openDrawer();
   };

   emptylist=()=>{
    return(
      <View style = {{alignSelf:'center',justifyContent:'center'}}>
      <Text style={{color:'white',fontSize:24,fontWeight:'bold',textAlign:'center'}}>No orders right now</Text>
      </View>
    )
  }

  fetchOrders = () => {
    db.collection('orders').onSnapshot((snapshot) => {
      var allOrders = [];

      snapshot.docs.map((doc) => {
        var order = doc.data();
        console.log("Orders Data"+doc.data());
        order['id'] = doc.id;
        allOrders.push(order);
      });
      this.setState({ orders: allOrders });
    });
  };

  renderItem = ({item}) => {    
    return(
      <View style={{ flex : 0.7,
        borderWidth : RFValue(2),marginTop:5}}>
 <Text style = {{
                        fontSize : RFValue(15),
                        marginLeft : RFValue(5),
                        marginTop : RFValue(-5),
                        padding:4
                    }}>Customer Name : {item.customerName}</Text>
                    <Text style = {{
                        fontSize : RFValue(15),
                        marginLeft : RFValue(5),
                        marginTop : RFValue(-5),
                        padding:4
                    }}>Email-{item.email}</Text>
                     <Text style = {{
                        fontSize : RFValue(15),
                        marginLeft : RFValue(5),
                        padding:4,
                    }}>Date : {item.dateoforder}</Text>
                     <Text style = {{
                        alignSelf : "center",
                        fontSize : RFValue(17),
                        fontWeight:'bold'
                    }}>Books: {item.books}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex:1,height:screenHeight,width:screenWidth}}>
        <View style={{flexDirection:'row'}}>
        <SafeAreaView style={{marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}} />
         <TouchableOpacity onPress={this.openDrawer1} style={{marginTop:20}}>
         
          <Feather name="menu" size={30} color="black" style={{margin:5}}/>
          </TouchableOpacity>
          <Image style={{ width: 80, height: 80,marginTop:20,alignSelf:'center',marginLeft:screenWidth/3.7}} source={require('../assets/digi.png')}></Image>
          </View>
        <Text style={stylus.namastetext}>Namaste,</Text>
        <Text style={stylus.namastetexto}>{this.state.name}</Text>
        <TouchableOpacity disabled={true} style={{backgroundColor:"purple",margin:15,borderRadius:10}}>
        <Text style={{marginLeft:10, fontSize:15,textAlign:'center',color:"white"}}>{this.state.quote}</Text>
        <Text style={{marginLeft:10,fontSize:17,fontWeight:'bold',textAlign:'center',color:"white"}}>-{this.state.author}</Text>
        </TouchableOpacity>
       <Text style={{margin:10,fontSize:16,fontWeight:'bold'}}>Orders</Text>
        <View style={stylus.cardContainer}>  
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.orders}
              renderItem={this.renderItem}  
              style={{marginBottom:30,borderRadius:30}} 
              ListEmptyComponent={()=>this.emptylist()}  
            />
          </View>  
      <Text style={{textAlign:"center",color:"grey",marginBottom:10, marginTop:screenHeight/9}}>Made with 💖 in the heart of Bharat </Text>

      <Text style={{textAlign:"center",color:"grey"}}>Data stored in Mumbai Data center </Text>

      </View>
    );
  }
}

const stylus = StyleSheet.create({
  namastetext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'purple',
    marginLeft:7
  },
  namastetexto: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue',
    marginLeft:7
  },
  cardContainer: {
   // flex: 0.9,    
    marginBottom:50, 
    borderRadius:30,   
    margin:10 
  },
});
