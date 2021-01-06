var samples = {
    sample_values:[],
    otu_ids:[],
    otu_labels:[]
};


d3.json("samples.json").then(function(d) {
    //console.log(d);
    sample.sample_values=d.sample_values;
    sample.otu_ids=d.otu_ids;
    sample.otu_labels=d.otu_labels;

}
)

// function min_array(ar) {
//     return [ss.min(ar),ar.indexOf(ss.min(ar))];
// }

// var trace1_x = 

// var trace1 = {
//     x:months,
//     y:monthly_sales,
//     type:'bar',
//   }