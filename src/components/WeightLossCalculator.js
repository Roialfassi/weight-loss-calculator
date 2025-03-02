import React, { useState } from 'react';
import ResultsSection from './ResultsSection';
import DarkModeToggle from './DarkModeToggle';

const WeightLossCalculator = () => {
  // Form state
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [dailyWalking, setDailyWalking] = useState('');
  const [activeTab, setActiveTab] = useState('timeframe'); // 'timeframe' or 'distance'
  const [height, setHeight] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  // Results state
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [weightToLose, setWeightToLose] = useState(0);
  const [dailyCalorieDeficit, setDailyCalorieDeficit] = useState(0);
  const [weeklyCalorieDeficit, setWeeklyCalorieDeficit] = useState(0);
  const [monthlyCalorieDeficit, setMonthlyCalorieDeficit] = useState(0);
  const [walkingDistance, setWalkingDistance] = useState(0);
  const [timeToGoal, setTimeToGoal] = useState(0);
  const [goalDate, setGoalDate] = useState('');
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');
  const [targetBmi, setTargetBmi] = useState(0);
  const [targetBmiCategory, setTargetBmiCategory] = useState('');
  
  // Error state
  const [errors, setErrors] = useState({
    currentWeight: '',
    targetWeight: '',
    timeFrame: '',
    dailyWalking: '',
    height: ''
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Calculate BMI and category
  const calculateBmi = (weight, height) => {
    if (!weight || !height) return { bmi: 0, category: '' };
    
    const bmiValue = weight / ((height / 100) * (height / 100));
    let category = '';
    
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    
    return { bmi: bmiValue, category };
  };
  
  // Calories burned per km (varies by weight, using average)
  const getCaloriesPerKm = (weight , targetWeight) => {
    return Math.round((weight + targetWeight) * 0.5);
  };
  
  // Form validation for timeframe tab
  const validateTimeframeForm = () => {
    const newErrors = {
      currentWeight: '',
      targetWeight: '',
      timeFrame: '',
      dailyWalking: '',
      height: ''
    };
    
    if (!currentWeight) {
      newErrors.currentWeight = 'Please enter your current weight';
    } else if (parseFloat(currentWeight) < 40 || parseFloat(currentWeight) > 300) {
      newErrors.currentWeight = 'Please enter a weight between 40-300 kg';
    }
    
    if (!targetWeight) {
      newErrors.targetWeight = 'Please enter your target weight';
    } else if (parseFloat(targetWeight) < 40 || parseFloat(targetWeight) > 300) {
      newErrors.targetWeight = 'Please enter a weight between 40-300 kg';
    }
    
    if (!timeFrame) {
      newErrors.timeFrame = 'Please enter your time frame';
    } else if (parseInt(timeFrame) < 1 || parseInt(timeFrame) > 104) {
      newErrors.timeFrame = 'Please enter a time between 1-104 weeks';
    }
    
    if (!height) {
      newErrors.height = 'Please enter your height';
    } else if (parseFloat(height) < 100 || parseFloat(height) > 250) {
      newErrors.height = 'Please enter a height between 100-250 cm';
    }
    
    setErrors(newErrors);
    return !newErrors.currentWeight && !newErrors.targetWeight && !newErrors.timeFrame && !newErrors.height;
  };

  // Form validation for distance tab
  const validateDistanceForm = () => {
    const newErrors = {
      currentWeight: '',
      targetWeight: '',
      timeFrame: '',
      dailyWalking: '',
      height: ''
    };
    
    if (!currentWeight) {
      newErrors.currentWeight = 'Please enter your current weight';
    } else if (parseFloat(currentWeight) < 40 || parseFloat(currentWeight) > 300) {
      newErrors.currentWeight = 'Please enter a weight between 40-300 kg';
    }
    
    if (!targetWeight) {
      newErrors.targetWeight = 'Please enter your target weight';
    } else if (parseFloat(targetWeight) < 40 || parseFloat(targetWeight) > 300) {
      newErrors.targetWeight = 'Please enter a weight between 40-300 kg';
    }
    
    if (!dailyWalking) {
      newErrors.dailyWalking = 'Please enter your daily walking distance';
    } else if (parseFloat(dailyWalking) <= 0 || parseFloat(dailyWalking) > 50) {
      newErrors.dailyWalking = 'Please enter a distance between 0.1-50 km';
    }
    
    if (!height) {
      newErrors.height = 'Please enter your height';
    } else if (parseFloat(height) < 100 || parseFloat(height) > 250) {
      newErrors.height = 'Please enter a height between 100-250 cm';
    }
    
    setErrors(newErrors);
    return !newErrors.currentWeight && !newErrors.targetWeight && !newErrors.dailyWalking && !newErrors.height;
  };
  
  // Calculate results with timeframe
  const calculateWithTimeframe = () => {
    if (!validateTimeframeForm()) return;
    
    const currentW = parseFloat(currentWeight);
    const targetW = parseFloat(targetWeight);
    const heightCm = parseFloat(height);
    
    if (targetW >= currentW) {
      setErrors({
        ...errors,
        targetWeight: 'Target weight must be less than current weight'
      });
      return;
    }
    
    const bmiData = calculateBmi(currentW, heightCm);
    const targetBmiData = calculateBmi(targetW, heightCm);
    setBmi(bmiData.bmi);
    setBmiCategory(bmiData.category);
    setTargetBmi(targetBmiData.bmi);
    setTargetBmiCategory(targetBmiData.category);
    
    const weightDiff = currentW - targetW;
    setWeightToLose(weightDiff);
    
    const totalCalories = weightDiff * 7700;
    const weeks = parseFloat(timeFrame);
    
    setDailyCalorieDeficit(totalCalories / (weeks * 7));
    setWeeklyCalorieDeficit(totalCalories / weeks);
    setMonthlyCalorieDeficit(totalCalories / (weeks / 4.35));
    
    const caloriesPerKm = getCaloriesPerKm(currentW , targetW);
    const totalDistanceKm = totalCalories / caloriesPerKm;
    const dailyDistanceKm = totalDistanceKm / (weeks * 7);
    
    setWalkingDistance(totalDistanceKm);
    setDailyWalking(dailyDistanceKm.toFixed(1));
    
    const today = new Date();
    const goalDateValue = new Date(today);
    goalDateValue.setDate(today.getDate() + (weeks * 7));
    setGoalDate(goalDateValue.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    
    setHasCalculated(true);
  };

  // Calculate results with daily walking distance
  const calculateWithDistance = () => {
    if (!validateDistanceForm()) return;
    
    const currentW = parseFloat(currentWeight);
    const targetW = parseFloat(targetWeight);
    const walking = parseFloat(dailyWalking);
    const heightCm = parseFloat(height);
    
    if (targetW >= currentW) {
      setErrors({
        ...errors,
        targetWeight: 'Target weight must be less than current weight'
      });
      return;
    }
    
    const bmiData = calculateBmi(currentW, heightCm);
    const targetBmiData = calculateBmi(targetW, heightCm);
    setBmi(bmiData.bmi);
    setBmiCategory(bmiData.category);
    setTargetBmi(targetBmiData.bmi);
    setTargetBmiCategory(targetBmiData.category);
    
    const weightDiff = currentW - targetW;
    setWeightToLose(weightDiff);
    
    const totalCalories = weightDiff * 7700;
    const caloriesPerKm = getCaloriesPerKm(currentW, targetW);
    
    const dailyCaloriesBurned = walking * caloriesPerKm;
    const daysToGoal = totalCalories / dailyCaloriesBurned;
    const weeksToGoal = daysToGoal / 7;
    
    setTimeToGoal(weeksToGoal);
    setTimeFrame(weeksToGoal.toFixed(1));
    
    setDailyCalorieDeficit(dailyCaloriesBurned);
    setWeeklyCalorieDeficit(dailyCaloriesBurned * 7);
    setMonthlyCalorieDeficit(dailyCaloriesBurned * 30);
    
    setWalkingDistance(totalCalories / caloriesPerKm);
    
    const today = new Date();
    const goalDateValue = new Date(today);
    goalDateValue.setDate(today.getDate() + daysToGoal);
    setGoalDate(goalDateValue.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    
    setHasCalculated(true);
  };

  // Calculate based on active tab
  const calculateResults = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      if (activeTab === 'timeframe') {
        calculateWithTimeframe();
      } else {
        calculateWithDistance();
      }
      
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-100 to-orange-200'}`}>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex justify-center items-center py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Calculator Card */}
          <div className={`rounded-2xl p-8 shadow-xl hover:-translate-y-1 transition-transform duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white border border-orange-100'}`}>
            <h1 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
              Weight Loss Journey Calculator
            </h1>
            
            {/* Tabs */}
            <div className={`flex mb-6 rounded-lg p-1 ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <button 
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'timeframe' 
                  ? (darkMode ? 'bg-gray-600 text-cyan-400 shadow' : 'bg-white shadow text-orange-600') 
                  : (darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-orange-500 hover:text-orange-600')}`}
                onClick={() => setActiveTab('timeframe')}
              >
                Calculate by Timeframe
              </button>
              <button 
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'distance' 
                  ? (darkMode ? 'bg-gray-600 text-cyan-400 shadow' : 'bg-white shadow text-orange-600') 
                  : (darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-orange-500 hover:text-orange-600')}`}
                onClick={() => setActiveTab('distance')}
              >
                Calculate by Distance
              </button>
            </div>
            
            <div className="mb-5">
              <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Weight (kg)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`h-5 w-5 ${darkMode ? 'text-cyan-400' : 'text-orange-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V10h3v-3.5c0-1.336 1.616-2.005 2.56-1.06l.94.94A7.001 7.001 0 0110 2.05 7.001 7.001 0 015 3.44l.94.94z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="number"
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' 
                      : 'border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400'
                  }`}
                  placeholder="e.g., 85"
                  min="40"
                  max="300"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                />
              </div>
              {errors.currentWeight && <p className="text-red-500 text-sm mt-1">{errors.currentWeight}</p>}
            </div>
            
            <div className="mb-5">
              <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Target Weight (kg)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`h-5 w-5 ${darkMode ? 'text-cyan-400' : 'text-orange-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="number"
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' 
                      : 'border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400'
                  }`}
                  placeholder="e.g., 70"
                  min="40"
                  max="300"
                  step="0.1"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                />
              </div>
              {errors.targetWeight && <p className="text-red-500 text-sm mt-1">{errors.targetWeight}</p>}
            </div>
            
            <div className="mb-5">
              <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Height (cm)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`h-5 w-5 ${darkMode ? 'text-cyan-400' : 'text-orange-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="number"
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' 
                      : 'border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400'
                  }`}
                  placeholder="e.g., 170"
                  min="100"
                  max="250"
                  step="1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
            </div>
            
            {activeTab === 'timeframe' ? (
              <div className="mb-5">
                <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Time Frame (weeks)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${darkMode ? 'text-cyan-400' : 'text-orange-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400'
                    }`}
                    placeholder="e.g., 12"
                    min="1"
                    max="104"
                    step="1"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                  />
                </div>
                {errors.timeFrame && <p className="text-red-500 text-sm mt-1">{errors.timeFrame}</p>}
              </div>
            ) : (
              <div className="mb-5">
                <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Daily Walking Distance (km)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${darkMode ? 'text-cyan-400' : 'text-orange-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400'
                    }`}
                    placeholder="e.g., 5"
                    min="0.1"
                    max="50"
                    step="0.1"
                    value={dailyWalking}
                    onChange={(e) => setDailyWalking(e.target.value)}
                  />
                </div>
                {errors.dailyWalking && <p className="text-red-500 text-sm mt-1">{errors.dailyWalking}</p>}
              </div>
            )}
            
            <button 
              onClick={calculateResults}
              disabled={isAnimating}
              className={`w-full py-3 text-white font-semibold rounded-lg transition-all transition-transform duration-300 flex items-center justify-center gap-2 ${
                darkMode
                  ? (isAnimating ? 'bg-cyan-700 opacity-75' : 'bg-cyan-600 hover:bg-cyan-500')
                  : (isAnimating ? 'bg-orange-600 opacity-75' : 'bg-orange-600 hover:bg-orange-500')
              }`}
            >
              {isAnimating ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
                </svg>
              )}
              Calculate Your Plan
            </button>
          </div>
          
          {/* Results Section */}
          <ResultsSection 
            darkMode={darkMode}
            hasCalculated={hasCalculated}
            isAnimating={isAnimating}
            activeTab={activeTab}
            weightToLose={weightToLose}
            dailyCalorieDeficit={dailyCalorieDeficit}
            weeklyCalorieDeficit={weeklyCalorieDeficit}
            monthlyCalorieDeficit={monthlyCalorieDeficit}
            walkingDistance={walkingDistance}
            timeToGoal={timeToGoal}
            goalDate={goalDate}
            timeFrame={timeFrame}
            dailyWalking={dailyWalking}
            bmi={bmi}
            bmiCategory={bmiCategory}
            targetBmi={targetBmi}
            targetBmiCategory={targetBmiCategory}
            currentWeight={currentWeight}
          />
        </div>
      </div>
    </div>
  );
};

export default WeightLossCalculator;
