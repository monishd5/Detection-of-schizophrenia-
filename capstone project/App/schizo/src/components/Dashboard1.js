import { supabase } from './supabaseClient';

// Function to get the average total score for the last 5 days
const getAvgTotalScoreForLast5Days = async () => {
  // Query to calculate the average of total_score for the last 5 days
  const { data, error } = await supabase
    .from('mood_tracking')
    .select('total_score')
    .gte('date', new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0]) // Get data from last 5 days
    .single(); // Adding .single() ensures that you get a single object in the data (optional)

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Calculate the average total score manually since `.avg` is not directly used like this
  const totalScoreSum = data.reduce((sum, row) => sum + row.total_score, 0);
  const avgTotalScore = totalScoreSum / data.length;

  console.log('Average Total Score for the last 5 days:', avgTotalScore);
};

// Call the function to get the average
getAvgTotalScoreForLast5Days();
