$( document ).ready(function() {
  console.log( " Project Works!" );
  $(".button-collapse").sideNav();
   $('.parallax').parallax();
});

var rIndex;
var scope,displayDetails;
window.scope = {};
scope.displayDetails ={};

      var proName=[],proArrival=[],proBurst=[],proComplete=[],proWaiting=[],proTurnAround=[];
      var n,p=proName,min,k=1,btime=0;
      var bt,temp,j,at,wt=[],tt=[],ta=0,sum=0;
      var wavg=0,tavg=0,tsum=0,wsum=0;
      var finalData=[];
        // check the empty input
             function checkEmptyInput()
             {
                 var isEmpty = false,
                     name = document.getElementById("name").value,
                     arrivaltime = document.getElementById("arrivaltime").value,
                     bursttime = document.getElementById("bursttime").value;

                 if(name === ""){
                     alert("Process Name Connot Be Empty");
                     isEmpty = true;
                 }
                  if(arrivaltime === ""){
                     alert("Arrival time Connot Be Empty");
                     isEmpty = true;
                 }
                  if(bursttime === ""){
                     alert("Burst time Connot Be Empty");
                     isEmpty = true;
                 }
                 return isEmpty;
             }

  //Add row
  function addHtmlTableRow()
  {
    table = document.getElementById("table");
    if(!checkEmptyInput()){
    var newRow = table.insertRow(table.length),
    cell1=newRow.insertCell(0),
    cell2=newRow.insertCell(1),
    cell3=newRow.insertCell(2),
    name = document.getElementById("name").value,
    arrivaltime = Number(document.getElementById("arrivaltime").value),
    bursttime = Number(document.getElementById("bursttime").value);
    proName.push(name);
    proArrival.push(arrivaltime);
    proBurst.push(bursttime);
    document.getElementById("name").value="",
    document.getElementById("arrivaltime").value="",
    document.getElementById("bursttime").value="";
    cell1.style.textAlign="center";
    cell2.style.textAlign="center";
    cell3.style.textAlign="center";
    cell1.innerHTML = name;
    cell2.innerHTML = arrivaltime;
    cell3.innerHTML = bursttime;
    // var a="test";
  }
}

function sjfSolve(){
  n=proName.length,p=proName,min,k=1,btime=0;
  bt=proBurst,temp,j,at=proArrival,wt=[],tt=[],ta=0,sum=0;
  wavg=0,tavg=0,tsum=0,wsum=0;


  for(i=0;i<n;i++)
  {
    for(j=0;j<n;j++)
    {
      if(at[i]<at[j])
      {
        temp=p[j];
        p[j]=p[i];
        p[i]=temp;
        temp=at[j];
        at[j]=at[i];
        at[i]=temp;
        temp=bt[j];
        bt[j]=bt[i];
        bt[i]=temp;
      }
    }
  }

  /*Arranging the table according to Burst time,
  Execution time and Arrival Time
  Arrival time <= Execution time
  */

  for(var j=0;j<n;j++)
  {
    btime=btime+bt[j];
    min=bt[k];
    for(var i=k;i<n;i++)
    {
      if (btime>=at[i] && bt[i]<min)
      {
        temp=p[k];
        p[k]=p[i];
        p[i]=temp;
        temp=at[k];
        at[k]=at[i];
        at[i]=temp;
        temp=bt[k];
        bt[k]=bt[i];
        bt[i]=temp;
      }
    }
    k++;
    }
    wt[0]=0;
    for(var i=1;i<n;i++)
    {
      sum=sum+bt[i-1];
      wt[i]=sum-at[i];
      wsum=wsum+wt[i];
    }

    wavg=(wsum/n);
    for(var i=0;i<n;i++)
    {
      ta=ta+bt[i];
      tt[i]=ta-at[i];
      tsum=tsum+tt[i];
    }

    tavg=(tsum/n);

    finalData[0]=p;
    finalData[1]=at;
    finalData[2]=bt;
    finalData[3]=wt;
    finalData[4]=tt;
    finalData[5]=wavg;
    finalData[6]=tavg;

    var exec=document.getElementById("outputTableDiv");

      exec.style.display="block";
      var otTable = document.getElementById('outputTable');
      var c;
      console.log(finalData.toString());
      //var newRow = table.insertRow(ouTable.length);
      for(var i=0;i<p.length;i++){

        var newRow = otTable.insertRow(otTable.length);
        console.log("works1");
        for(var j=0;j<finalData.length-2;j++){
          c=newRow.insertCell(j);
          c.style.textAlign="center"
          c.innerHTML=finalData[j][i];
          console.log("works1");
        }
      }
      document.getElementById('avgot').innerHTML="Average Waiting Time = "+finalData[5]+"</br> Average Turn-around Time = "+finalData[6];
      var exec=document.getElementById("outputTableDiv");

        exec.style.display="block";


}
