import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BaseChartDirective } from "ng2-charts/ng2-charts";
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
//import {AccordionModule} from "ngx-accordion";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  
    ref=[];
    mapdevId:object={};
    status:boolean=false;
    chartData1=[];
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

    constructor(private http: Http) { 
      
    }
    expanded:boolean=false;

  showCheckboxes=function() {
 var checkboxes;
 console.log("hello");
  if (!this.expanded) {
    checkboxes.style.display = "block";
    this.expanded = true;
  } else {
    checkboxes.style.display = "none";
    this.expanded = false;
  }
}
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
 
    onChange() {
        console.log(this.optionsModel);
    }
    chartOptions = {
      responsive: true
    };

    onGroupChange=function(event){
        console.log(event);
        event.preventDefault();
    
    this.value=event.target.value;
    //var b=event.target.elements[1].value;
    console.log(this.value);
    }


   mapping=function(city)
   {
      this.http.get("http://localhost:3000/display/mapping").subscribe(res=>{
        console.log(city);
        city.preventDefault();
    
        this.value=city.target.value;
        var temp1=res.json();
        for(let i=0,c=0,m=0;i<4;i++)
        {
          var dbcity=temp1.rows[i].doc.city;
          if(this.value==dbcity)
          {
            console.log("db")
            this.iscity=true;
            this.ref[c]=temp1.rows[i].doc._id;
            c++;
            this.map[m]=temp1.rows[i].doc.mapid;
            m++;
          }
        }
      })
  }
  
    allcompare=function()
    {
      this.chartData2=[];
      this.http.get("http://localhost:3000/display/graph").subscribe(res=>{
        this.status=true;
        console.log(this.map);
        var temp=res.json();
        for(let i=0,j=0,k=0;i<16;i++)
        {
          var area=temp.rows[i].doc.data.d.mapId;
          var usage=temp.rows[i].doc.data.d.usage;
          if(area==this.map[0])
          {
              this.dataall1[j]=usage;
              j++;
          }
          else if(area==this.map[1])
          {
            this.dataall2[k]=usage;
            this.chartLabels[k]=temp.rows[i].doc.timestamp;
            var date1=new Date(this.chartLabels[k]);
            var time=date1.getDate();
            this.date[k]=time;
            k++; 
          }
       }
      this.chartData2 = [
        { data: this.dataall1 , label: this.ref[0] },
        { data: this.dataall2 , label: this.ref[1] }
      ];
        console.log(this.dataall1);
        console.log(this.dataall2);
      })

    }

  graph=function(id)
  {
    id.preventDefault();
    this.value=id.target.value;
    console.log(this.value);
    this.chartData2=[];
    
    this.status=true;
    this.http.get("http://localhost:3000/display/graph").subscribe(res=>{
       console.log(res);
      var temp=res.json();
        
      for (let i=0,j=0,k=0; k<16;k++)
      {
        var iddb=temp.rows[k].doc.deviceId;
        console.log(id);
        var mydate=temp.rows[k].doc.timestamp;
        if(this.value==iddb)
        {
          this.chartData1[i]=temp.rows[k].doc.data.d.usage;
          console.log(this.chartData1);
          this.chartLabels[i]=temp.rows[i].doc.timestamp;
          var date1=new Date(this.chartLabels[i]);
          var time=date1.getDate();
          this.date[i]=time;
          i++;
        }
      }
        
      console.log("data1"+this.chartData1);
      console.log("data3"+this.chartData3);
       
    this.chartData2 = [
      { data:  this.chartData1 , label: this.value }
    ];
      //console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));

  });
      // console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));
  }


  compare=function(id)
  {
    this.chartData2=[];
    console.log("hello");
    this.status=true;
    this.http.get("http://localhost:3000/display/graph").subscribe(res=>{
       console.log(res);
      var temp=res.json();
        
      for (let i=0,j=0,k=0; k<16;k++)
      {
        var iddb=temp.rows[k].doc.deviceId;
        var mydate=temp.rows[k].doc.timestamp;
         
        if(id==iddb)
        {
          this.chartData1[i]=temp.rows[k].doc.data.d.usage;
          console.log(this.chartData1);
          this.chartLabels[i]=temp.rows[i].doc.timestamp;
          var date1=new Date(this.chartLabels[i]);
          var time=date1.getDate();
          this.date[i]=time;
          i++;
        }
      }
      console.log("data1"+this.chartData1);
      console.log("data3"+this.chartData3);
       
      this.chartData2 = [
        { data:  this.chartData1 , label: this.value },
      ];
        console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));

      });
      // console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));
  }


  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this.http.get("http://localhost:3000/display/cities").subscribe(res=>{
      var temp=res.json();
      console.log(temp);
      for(let i=0;i<3;i++){
      this.arrcity[i]=temp.rows[i].doc.city;
      this.myOptions = [
       
        { id: this.arrcity[0], name: this.arrcity[0] },
        { id: this.arrcity[1], name: this.arrcity[1] },
        { id: this.arrcity[2], name: this.arrcity[2] }
        
    ];
      }
      
      

    })
    
  }

}
