import React from 'react';

const ResultsSection = ({ 
  darkMode, 
  hasCalculated, 
  isAnimating, 
  activeTab,
  weightToLose,
  dailyCalorieDeficit,
  weeklyCalorieDeficit,
  monthlyCalorieDeficit,
  walkingDistance,
  timeToGoal,
  goalDate,
  timeFrame,
  dailyWalking,
  bmi,
  bmiCategory,
  targetBmi,
  targetBmiCategory,
  currentWeight
}) => {
  
  // Get BMI color
  const getBmiColor = (category) => {
    switch(category) {
      case 'Underweight':
        return darkMode ? 'text-blue-400' : 'text-blue-500';
      case 'Normal weight':
        return darkMode ? 'text-green-400' : 'text-green-500';
      case 'Overweight':
        return darkMode ? 'text-yellow-400' : 'text-yellow-500';
      case 'Obesity':
        return darkMode ? 'text-red-400' : 'text-red-500';
      default:
        return darkMode ? 'text-gray-400' : 'text-gray-500';
    }
  };

// Warning for aggressive goals
const showWarning = hasCalculated && activeTab === 'timeframe' && (weightToLose / timeFrame > 1);
  
return (
  <div className={`rounded-2xl p-6 shadow-lg transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 hover:translate-y-1'} ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
    <h1 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>Your Results</h1>
    
    {hasCalculated ? (
      <>
        {/* BMI Section */}
        <div className={`mb-4 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-cyan-400' : 'bg-cyan-50 border-cyan-500'}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current BMI</p>
              <p className={`text-2xl font-bold ${getBmiColor(bmiCategory)}`}>{bmi.toFixed(1)}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{bmiCategory}</p>
            </div>
            <div className="text-right">
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target BMI</p>
              <p className={`text-2xl font-bold ${getBmiColor(targetBmiCategory)}`}>{targetBmi.toFixed(1)}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{targetBmiCategory}</p>
            </div>
          </div>
        </div>
        
        <div className={`mb-4 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-cyan-400' : 'bg-gray-50 border-cyan-500'}`}>
          <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weight to Lose</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{weightToLose.toFixed(1)} kg</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{(weightToLose * 2.2).toFixed(1)} lbs</p>
        </div>
        
        {activeTab === 'timeframe' ? (
          <>
            <div className={`mb-4 p-4 rounded-lg border-l-4 flex items-start ${darkMode ? 'bg-gray-700 border-blue-400' : 'bg-blue-50 border-blue-500'}`}>
              <div className="w-2/3">
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Daily Calorie Deficit</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{dailyCalorieDeficit.toFixed(0)} calories</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>To reach your goal in {timeFrame} weeks</p>
              </div>
              <div className="w-1/3 border-l border-gray-200 pl-3">
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Walking</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{dailyWalking} km/day</p>
              </div>
            </div>
            
            <div className={`mb-4 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-purple-400' : 'bg-purple-50 border-purple-500'}`}>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Goal Date</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{goalDate}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>If you start today</p>
            </div>
          </>
        ) : (
          <>
            <div className={`mb-4 p-4 rounded-lg border-l-4 flex items-start ${darkMode ? 'bg-gray-700 border-green-400' : 'bg-green-50 border-green-500'}`}>
              <div className="w-2/3">
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time to Goal</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{timeToGoal.toFixed(1)} weeks</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{(timeToGoal * 7).toFixed(0)} days</p>
              </div>
              <div className="w-1/3 border-l border-gray-200 pl-3">
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Walking</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{dailyWalking} km/day</p>
              </div>
            </div>
            
            <div className={`mb-4 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-purple-400' : 'bg-purple-50 border-purple-500'}`}>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Goal Achievement Date</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{goalDate}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>If you start today</p>
            </div>
          </>
        )}
        
        <div className={`mb-4 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-amber-400' : 'bg-amber-50 border-amber-500'}`}>
          <div className="flex items-start">
            <div className="w-2/3">
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weekly Calorie Deficit</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{weeklyCalorieDeficit.toFixed(0)} calories</p>
            </div>
            <div className="w-1/3 border-l border-gray-200 pl-3">
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Walking</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{(parseFloat(dailyWalking) * 7).toFixed(1)} km/week</p>
            </div>
          </div>
        </div>
        
        <div className={`mb-4 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-pink-400' : 'bg-pink-50 border-pink-500'}`}>
          <div className="flex items-start">
            <div className="w-2/3">
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Calorie Deficit</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>{monthlyCalorieDeficit.toFixed(0)} calories</p>
            </div>
            <div className="w-1/3 border-l border-gray-200 pl-3">
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Walking</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{(parseFloat(dailyWalking) * 30).toFixed(1)} km/month</p>
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-teal-400' : 'bg-teal-50 border-teal-500'}`}>
          <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Distance to Walk</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>{walkingDistance.toFixed(1)} km</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Based on your weight of {currentWeight}kg 
            ({Math.round(parseFloat(currentWeight) * 0.7)} calories per km walked)
          </p>
        </div>
        
        {showWarning && (
          <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${darkMode ? 'bg-yellow-900 border-l-4 border-yellow-500' : 'bg-yellow-50 border-l-4 border-yellow-400'}`}>
            <svg className={`h-6 w-6 flex-shrink-0 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>For healthy, sustainable weight loss, aim for 0.5-1kg per week. Consult with a healthcare professional before starting any weight loss journey.</span>
          </div>
        )}
      </>
    ) : (
      <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} py-12`}>
        <svg className={`h-12 w-12 mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 1a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2zm-2-4a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
        <p className="italic">Fill in your details and click calculate to see your personalized weight loss plan.</p>
      </div>
    )}

    {/* Footer */}
    <div className={`mt-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      <p>© {new Date().getFullYear()} Weight Loss Calculator | Roi Alfassi</p>
    </div>
  </div>
);
};

export default ResultsSection;