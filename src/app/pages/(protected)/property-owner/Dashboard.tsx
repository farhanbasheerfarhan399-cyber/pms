// src/app/pages/property-owner/Dashboard.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Wrench,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PropertyOwnerDashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data for stats
  const stats = {
    totalProperties: {
      value: 24,
      change: '+8% from last month',
      trend: 'up',
      percentage: 8
    },
    totalTenants: {
      value: 156,
      change: '+12% from last month',
      trend: 'up',
      percentage: 12
    },
    monthlyRevenue: {
      value: 52000,
      change: '+5.8% from last month',
      trend: 'up',
      percentage: 5.8
    },
    pendingMaintenance: {
      value: 8,
      change: '3% from last month',
      trend: 'down',
      percentage: 3
    }
  };

  // Mock data for rent collection chart
  const rentCollectionData = [
    { month: 'Jan', amount: 42000 },
    { month: 'Feb', amount: 47000 },
    { month: 'Mar', amount: 49000 },
    { month: 'Apr', amount: 45000 },
    { month: 'May', amount: 51000 },
    { month: 'Jun', amount: 55000 },
  ];

  // Mock data for maintenance costs chart
  const maintenanceCostsData = [
    { month: 'Jan', cost: 8200 },
    { month: 'Feb', cost: 6500 },
    { month: 'Mar', cost: 9800 },
    { month: 'Apr', cost: 7200 },
    { month: 'May', cost: 8900 },
    { month: 'Jun', cost: 7800 },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      title: 'Rent payment received',
      description: 'John Smith - Unit 101',
      time: '2 hours ago',
      icon: DollarSign,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Maintenance request',
      description: 'Sarah Johnson - Unit 205',
      time: '4 hours ago',
      icon: Wrench,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Lease renewal pending',
      description: 'Mike Brown - Unit 302',
      time: '1 day ago',
      icon: AlertCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'New tenant onboarded',
      description: 'Emma Davis - Unit 108',
      time: '2 days ago',
      icon: Users,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="px-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Track your property portfolio performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Properties */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Properties</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stats.totalProperties.value}</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <p className="text-xs sm:text-sm text-green-600 font-medium">{stats.totalProperties.change}</p>
                </div>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Tenants */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Tenants</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stats.totalTenants.value}</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <p className="text-xs sm:text-sm text-green-600 font-medium">{stats.totalTenants.change}</p>
                </div>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  ${stats.monthlyRevenue.value.toLocaleString()}
                </h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <p className="text-xs sm:text-sm text-green-600 font-medium">{stats.monthlyRevenue.change}</p>
                </div>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Maintenance */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Pending Maintenance</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stats.pendingMaintenance.value}</h3>
                <div className="flex items-center gap-1">
                  <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                  <p className="text-xs sm:text-sm text-red-600 font-medium">{stats.pendingMaintenance.change}</p>
                </div>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Rent Collection Overview */}
        <Card className="border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Rent Collection Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!mounted ? (
              <div className="h-64 sm:h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Loading chart...</p>
              </div>
            ) : (
              <div className="h-64 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rentCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toLocaleString()}`, 'Amount']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Maintenance Costs */}
        <Card className="border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Maintenance Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!mounted ? (
              <div className="h-64 sm:h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Loading chart...</p>
              </div>
            ) : (
              <div className="h-64 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={maintenanceCostsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toLocaleString()}`, 'Cost']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      dot={{ fill: '#f97316', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`${activity.bgColor} p-2 sm:p-2.5 rounded-lg shrink-0`}>
                  <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-0.5">
                    {activity.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}