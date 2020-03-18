
# Javascript Code Test

Please build a single page application to visualize the workout data provided in `workout-data.json`, including a map, a graph, and an algorithm to analyze average power output.

## Algorithm
- Write the most efficient method that finds the "best" 20 minute power effort.
- "Best" is defined as highest continuous average for the given time period.

## User Interface
- Display the gps path on a Map
- Display the power output over time on a graph, using time as the X axis
- When user selects a range of time on the graph, highlight the corresponding range on the map
- Display the 1, 5, 10, 15, and 20 minute "best" efforts

## Hints
The purpose of this test is to demonstrate your understanding of JavaScript web application patterns and best practices, efficient algorithms, and general clean coding habits. We realize this interview question can be a substantial task. To save time, do not focus too much on CSS styling, layouts, boundary use cases, etc. You are free to use whatever frameworks and libraries you like.

## Submission
Please submit your test as an emailed zip file (please do not include the node_modules folder) or link to a private repo or private file sharing system. You can also provide a hosted link or it can run locally.

#Issues and Suggestions For Improvement

##Algorithm Accuracy
-Your algorithm was efficient, and it was nearly correct, but it was still of by up to 10%
Algorithm accuracy could have easily verified and improved with unit tests, but no tests were included
##Separation of Concerns
In calculateBestEffort, you have hard coded all of the channel names (power, heart rate, distance) at multiple points in the code. This will be hard to maintain in the future if we add more channels to the system. 'How to calculate a moving average' is a separate concern from 'what channels do we care about', and should be separated in the code.
##Attention to Small Details
Original code test instructions asked for 1,5,10,15,20 minute intervals, but 15 was missing from solution
Five minute interval button was broken due to typo (calcugslateBestEffort)Feedback for improvement