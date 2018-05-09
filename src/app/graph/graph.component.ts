import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BaseChartDirective } from "ng2-charts/ng2-charts";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  
    ref=[];
    mapdevId:object={};
    status:boolean=false;
    chartData1:number[][]=new Array();
    chartData3=[];
    chartLabels=[];
    arrcity=[];
    city=[];
    obj:object={};
    date=[];
    iscity:boolean=false;
    dataall1=[];
    dataall2=[];
    dataall3=[];
    map=[];
    chartData2=[];
    flag:any=0;
    value:string;
    isshow:boolean=false;
    selectedArea=[];
    date1:number;
    date2:number;

    dropdownCityList = [];
    selectedCityItems = [];
    dropdownCitySettings = {};

    dropdownAreaList = [];
    selectedAreaItems = [];
    dropdownAreaSettings = {};


    constructor(private http: Http) { 
      
    }
    



   mapping=function()
   {
      this.http.get("http://localhost:3000/display/mapping").subscribe(res=>{
        var temp1=res.json();
        for(let i=0,c=0,m=0;i<4;i++)
        {
          var dbcity=temp1.rows[i].doc.city;
          for(let j=0;j<this.selectedCityItems.length;j++){
          if(this.selectedCityItems[j]==dbcity)
          {
            console.log("db")
            this.iscity=true;
            this.ref[c]=temp1.rows[i].doc._id;
            c++;
            this.map[m]=temp1.rows[i].doc.mapid;
            m++;
          }
        }
        }
        //console.log("ref"+this.ref);
        //console.log(this.map);
        this.dropdownAreaList=this.ref;
        //console.log(this.dropdownAreaList);

      //   this.dropdownAreaSettings = {
      //     singleSelection: false,
      //     idField: 'item_id',
      //     textField: 'item_text',
      //     selectAllText: 'Select All',
      //     unSelectAllText: 'UnSelect All',
      //     itemsShowLimit: 3,
      //     allowSearchFilter: true
      // };
      })
  }
  

  graph=function(e)
  {
    console.log(e);
    var d1=new Date(e.d1);
    var d2=new Date(e.d2);

    this.date1=d1.getDate();
    this.date2=d2.getDate();
    console.log(this.selectedAreaItems);
    console.log(this.value);
    this.chartData2=[];
    this.chartLabels=[];
    this.date=[];
    this.chartData1=[];
    this.chartData3=[];
    
    this.status=true;
    this.http.get("http://localhost:3000/display/graph").subscribe(res=>{
       console.log(res);
      var temp=res.json();
      var s=0;
      

      for (let i=0,j=0,k=0; k<16;k++)
      {
        var iddb=temp.rows[k].doc.deviceId;
       var mydate=temp.rows[k].doc.timestamp;
       var date11=new Date(mydate);
        var time=date11.getUTCDate();
        
        //console.log(time);
        //console.log(this.date1+" "+this.date2);
       if(this.date1<=time && this.date2>=time){
        
        if(this.selectedAreaItems[s]==iddb)
        {
          this.chartData1[i]=temp.rows[k].doc.data.d.usage;
          this.date[i]=time;
          i++;
        } 
        else if(this.selectedAreaItems[s+1]==iddb){
          this.chartData3[j]=temp.rows[k].doc.data.d.usage;
          this.date[j]=time;
          j++;
        }
      }
    }
  
    for(let i=0;i<=this.date.length;i++)
    {
		  for(let j=i+1;j<this.date.length;j++)
		{
			if(this.date[i]>this.date[j])
			{
				temp  =this.date[i];
				this.date[i]=this.date[j];
        this.date[j]=temp;
        
        if(this.chartData1.length){
        var temp1=this.chartData1[i];
        this.chartData1[i]=this.chartData1[i+1];
        this.chartData1[i+1]=temp1;
      }

      if(this.chartData3.length){
        var temp2=this.chartData3[i];
        this.chartData3[i]=this.chartData3[i+1];
        this.chartData3[i+1]=temp2;
      }

			}
		}
	}
    s++;
      console.log("data1"+this.date);
      console.log("data3"+this.chartData3);
       
      if(this.chartData1.length && this.chartData3.length){
        this.chartData2 = [
          { data:  this.chartData1 , label: this.selectedAreaItems[0] },
          { data:  this.chartData3 , label: this.selectedAreaItems[1] }
      ];
    }
    else{
      this.chartData2 = [
        { data:  this.chartData1 , label: this.selectedAreaItems[0] }
      ];
    }
    
      //console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));

    })
      // console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));
  }

  ngOnInit() {
    this.selectedCityItems=[];
    
    this.http.get("http://localhost:3000/display/cities").subscribe(res=>{
      var temp=res.json();
      console.log(temp);
      for(let i=0;i<3;i++){
      this.arrcity[i]=temp.rows[i].doc.city;
      
      }
      console.log(this.dropdownCityList);
      this.dropdownCityList = 
        
      
        this.arrcity
        
      
    })

  this.dropdownCitySettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
  };
}




onCitySelect(item:any){
  
  console.log(item);
  console.log("select"+this.selectedCityItems);
  console.log("items selected"+item);
  this.mapping();
}

onCitySelectAll(items: any){
  console.log(items);
}

onCityDeSelectAll(items: any){
  console.log(items);
    
  }

  onAreaSelect(item:any){
  
    console.log(item);
    console.log(this.selectedAreaItems);
    console.log("items selected"+item);  
  }
  
  onAreaSelectAll(items: any){
    console.log(items);
  }
  
  onAreaDeSelectAll(items: any){
    console.log(items);
      
    }
  
}


