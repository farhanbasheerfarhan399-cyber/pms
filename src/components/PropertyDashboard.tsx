'use client';
import React from 'react';
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
    { month: 'Jan', collected: 42000, pending: 3000 },
    { month: 'Feb', collected: 47000, pending: 2500 },
    { month: 'Mar', collected: 49000, pending: 2000 },
    { month: 'Apr', collected: 45000, pending: 3500 },
    { month: 'May', collected: 51000, pending: 2800 },
    { month: 'Jun', collected: 55000, pending: 1500 },
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
    <div className="space-y-4 sm:space-y-6 p-4">
      {/* Page Header */}
      <div className="px-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Track your property portfolio performance</p>
      </div>

      {/* Stats Cards - Reduced Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Properties */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4 pt-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Total Properties</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.totalProperties.value}</h3>
                <p className="text-sm text-green-600 font-medium">{stats.totalProperties.change}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Tenants */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Total Tenants</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.totalTenants.value}</h3>
                <p className="text-sm text-green-600 font-medium">{stats.totalTenants.change}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Monthly Revenue</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  ${stats.monthlyRevenue.value.toLocaleString()}
                </h3>
                <p className="text-sm text-green-600 font-medium">{stats.monthlyRevenue.change}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Maintenance */}
        <Card className="border hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">Pending Maintenance</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.pendingMaintenance.value}</h3>
                <p className="text-sm text-red-600 font-medium">{stats.pendingMaintenance.change}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Reduced Height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Rent Collection Overview */}
        <Card className="border">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              Rent Collection Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {!mounted ? (
              <div className="h-48 sm:h-56 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Loading chart...</p>
              </div>
            ) : (
              <div className="h-48 sm:h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rentCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                              <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.month}</p>
                              <p className="text-sm text-blue-600">
                                collected : {payload[0].value?.toLocaleString()}
                              </p>
                              <p className="text-sm text-orange-600">
                                pending : {payload[1].value?.toLocaleString()}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="collected" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="pending" stackId="a" fill="#fb923c" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Maintenance Costs */}
        <Card className="border">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              Maintenance Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {!mounted ? (
              <div className="h-48 sm:h-56 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Loading chart...</p>
              </div>
            ) : (
              <div className="h-48 sm:h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={maintenanceCostsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      dot={{ fill: '#f97316', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities - Reduced Height */}
      <Card className="border">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 mb-0.5">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
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