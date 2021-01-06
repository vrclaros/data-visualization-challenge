

function drop_down(){

d3.json("samples.json").then(function(sample) {
    var names = sample.names;
    //console.log(names)
    var dropdown = d3.select("#selDataset")
    names.forEach(sample => {
        dropdown.append("option")
        .text(sample)
        .property("value",sample)
    });
    var sample_value = names[0];
    metadata(sample_value);

    create_chart(sample_value);


}
);
}

drop_down();


function metadata(sample_id){
    d3.json("samples.json").then(function(sample) {
        var demograph = sample.metadata;
        var result_array = demograph.filter(object => object.id == sample_id);
        var metadata = result_array[0]

        var display = d3.select("#sample-metadata");
        display.html("");
        Object.entries(metadata).forEach(([key,value])=> {
            display.append("h6").text(`${key} ${value}`);

        });

    });
}

function optionChanged(new_sample){
    metadata(new_sample);
    create_chart(new_sample);
} 

function create_chart(sample_id){
    d3.json("samples.json").then(function(sample) {
        var chart_sample = sample.samples;
        var result_array = chart_sample.filter(object => object.id == sample_id);
        var sample_graph = result_array[0];

        var otu_id = sample_graph.otu_ids;
        var otu_label = sample_graph.otu_labels;
        var sample_value = sample_graph.sample_values;

        var bubble_data = [{
            x:otu_id, 
            y:sample_value,
            text: otu_label,
            mode: "markers",
            marker: {
                size: sample_value,
                color: otu_id,
                colorscale: "Earth"
            }
        }];

        Plotly.newPlot("bubble",bubble_data);

        var bar_data = [{
            x: sample_value.slice(0,10).reverse(),
            y: otu_id.slice(0,10).map(otu_id => `OTUID${otu_id}`).reverse(),
            text: otu_label.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",

        }];

        Plotly.newPlot("bar",bar_data);

    });
}