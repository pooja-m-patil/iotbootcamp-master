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
    chartData1:number[][];
    chartData=[];
    chartData3=[];
    chartLabels=[];
    arrcity=[];
    city=[];
    obj:object={};
    month;object={};
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
    myarray:number[][]=new Array;
    
    constructor(private http: Http) { 
      
    }
    



   mapping=function()
   {
     this.ref=[];
     this.map=[];
     this.selectedAreaItems=[];
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
    this.chartData2=[];
    this.chartLabels=[];
    this.date=[];
    this.chartData1=[];
    this.chartData3=[];
    this.chartData=[];

    console.log(e);
    var d1=new Date(e.d1);
    var d2=new Date(e.d2);
    this.date1=d1.getDate();
    this.date2=d2.getDate();
   
    var m=d1.getMonth();
    console.log(m);
    
    for(let d=0,d1=this.date1;d1<=this.date2;d1++){
      this.date[d]=d1;
      d++;
    }

    for(let a=0;a<this.selectedAreaItems.length;a++){
            this.myarray[a]=new Array(32);
          }

    console.log(this.selectedAreaItems);
    console.log(this.date);
     for(let a=0;a<this.selectedAreaItems.length;a++){
        
      this.month={
        "m":m+1,
        "array":this.selectedAreaItems[a]
      }
        this.http.post("http://localhost:3000/display/graph",this.month).subscribe(res=>{
        //console.log(res['_body']);
        var temp=res.json();
        var m=0;
        console.log(temp);
        // for(let d=0;d<this.date.length;d++){
        //   var date=new Date(temp[d].data.d.timestamp);
        //   var dbdate=date.getDate();
        //   console.log(date);
        //   console.log(dbdate);
        //   if(this.date[d]==dbdate){
        for(let i=0;i<temp.length;i++){
          for(let d=0;d<this.date.length;d++){
            var date=new Date(temp[i].timestamp);
            var dbdate=date.getDate();
            console.log(dbdate);
            console.log(this.date[d]);
            if(this.date[d]==dbdate){
              this.myarray[a][m]=temp[i].data.d.usage;
              m++;
        }
      }
    }
        // console.log(this.chartData);
        // this.myarray[a]=this.chartData;
        // console.log(this.myarray[a]);
        // m++;
     })
     
      }
    console.log(this.myarray);
    //this.status=true;
    // this.http.post("http://localhost:3000/display/graph",this.month).subscribe(res=>{
    //    console.log(res);
    //   var temp=res.json();
    //   var s=0;
    //   console.log(temp);

    //   for (let i=0,j=0,k=0; k<16;k++)
    //   {
    //     var iddb=temp.rows[k].doc.deviceId;
    //     var mydate=temp.rows[k].doc.timestamp;
    //     var date11=new Date(mydate);
    //     var time=date11.getUTCDate();
    //     var usage=temp.rows[k].doc.data.d.usage;
        
    //     for(let a=0;a<this.selectedAreaItems.length;a++){
    //       this.myarray[a]=new Array(32);
    //     }

    //     // this.myarray[0][0]="h";
    //     // this.myarray[0][1]="d";
    //     // this.myarray[1][1]="sh";
        
    //     // this.myarray[1][0]="hs";
        
    //     //console.log(this.date1+" "+this.date2);
    //     for(let t=0;t<4;t++)
    //     {
    //       if(this.date[t]==time)
    //       {
            
    //         for(let s=0;s<this.selectedAreaItems.length;s++)
    //         {
    //           for(let y=0;y<4;y++)
    //           {
    //             if(this.selectedAreaItems[s]==iddb)
    //             {
    //               console.log("abcvc");
    //               console.log(usage);
    //               this.myarray[t][y]=usage;
    //             }
    //           }
    //         }
    //       }
    //     }

            //   this.chartData1[t]=usage;
            // }
            // else if(this.selectedAreaItems[s+1]==iddb){
            //   this.chartData3[t]=usage;
            // }
            
            // for (let m=0;m<3; m++){
            //   this.myarray[m]=new Array(3)
            //   if(m==1){
            //     console.log("0");
            //     this.myarray[m]="hello";
            //   }
            // }
          // }
          
        //}
    //    console.log(this.myarray);
    //   if(this.chartData1.length && this.chartData3.length){
    //     this.chartData2 = [
    //       { data:  this.chartData1 , label: this.selectedAreaItems[0] },
    //       { data:  this.chartData3 , label: this.selectedAreaItems[1] }
    //   ];
    // }
    // else{
    //   this.chartData2 = [
    //     { data:  this.chartData1 , label: this.selectedAreaItems[0] }
    //   ];
    // }
    
    //   //console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));

    // })
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

// create_array=function(name,size)
// {
  
//   // perform operations on array_name

// }


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


