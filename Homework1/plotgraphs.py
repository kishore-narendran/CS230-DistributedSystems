import plotly
import json
print plotly.__version__  # version >1.9.4 required
from plotly.graph_objs import Scatter, Layout

graph_output = {
"data": [
    #Scatter(x=data['memory'], y=data['average_wait_times'], mode='lines+markers', name=str(data['processors'])),
    #Scatter(x=data['memory'], y=data['average_wait_times'], mode='lines+markers', name='Test')
],
"layout": Layout(
    title="Plots of Average Wait Time vs # of Memory Modules",
    xaxis=dict(
        title='# of Memory Modules',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
    ),
    yaxis=dict(
        title='Average Wait Time',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
    )
)
};

with open('output-100_100000.json') as data_file:
    data = json.load(data_file)
    graph_output['data'].append(Scatter(x=data['memory'], y=data['average_wait_times'], mode='lines+markers', name=str(data['processors']) + ' Processors'))

with open('output-200_100000.json') as data_file:
    data = json.load(data_file)
    graph_output['data'].append(Scatter(x=data['memory'], y=data['average_wait_times'], mode='lines+markers', name=str(data['processors']) + ' Processors'))

with open('output-300_100000.json') as data_file:
    data = json.load(data_file)
    graph_output['data'].append(Scatter(x=data['memory'], y=data['average_wait_times'], mode='lines+markers', name=str(data['processors']) + ' Processors'))

plotly.offline.plot(graph_output)
