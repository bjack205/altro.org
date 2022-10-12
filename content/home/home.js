export default function makeHomeContent() {
  const content = {
    typewriter: [
      'A fast solver for optimization!',
      'State-of-the-art performance',
      'Convenient interface for dynamics',
      'Fast convergence to tight constraint',
    ],
    features: [
      {
        title: 'Performance',
        description:
          'State-of-the-art performance for both convex (linear dynamics) and nonlinear trajectory optimization problems.',
      },
      {
        title: 'Interface',
        description:
          'Convenient interface for dynamics and problem definition via TrajectoryOptimization.jl and RobotDynamics.jl.',
      },
      {
        title: 'Nonlinear state',
        description: 'Supports generic nonlinear state and control constraints at each time step.',
      },
      {
        title: 'SOCPs',
        description: 'Supports second-order-cone programs (SOCPs).',
      },
      {
        title: 'Trajectories',
        description: 'Allows initialization of both state and control trajectories.',
      },
      {
        title: 'Integration',
        description:
          'Supports integration up to 4th-order Runge-Kutta methods. Higher-order methods are possible but not yet implemented',
      },
      {
        title: '3D Rotations',
        description: 'Supports optimization on the space of 3D rotations.',
      },
      {
        title: 'Efficient Methods',
        description:
          'Provides efficient methods for auto-differentiation of costs, constraints, and dynamics via ForwardDiff.jl and FiniteDiff.jl.',
      },
    ],
    graphContent: {
      title: 'ALTRO beats most solvers.',
      description:
        'ALTRO has demonstrated state-of-the-art performance for convex conic MPC problems, beating SOCP solvers such as Mosek, ECOS, and SCS. For quadratic MPC problems, ALTRO has performance on-par or better than OSQP.',
    },
    graph: '/graph.png',
    contributors: [
      {
        profile: 'http://roboticexplorationlab.org/img/people/zac.jpg',
        name: 'Zac Manchester',
        description: 'Assistant Professor',
        affiliation: 'Carnegie Mellon University',
        website: 'https://www.linkedin.com/in/zacmanchester/',
      },
      {
        profile: 'http://roboticexplorationlab.org/img/people/brian.jpg',
        name: 'Brian Jackson',
        description: 'Real-time motion planning',
        affiliation: 'Carnegie Mellon University',
        website: 'https://bjack205.github.io/',
      },
      {
        profile: 'http://roboticexplorationlab.org/img/people/taylor.jpg',
        name: 'Taylor Howell',
        description: 'Model-predictive control and differentiable simulators for contact',
        affiliation: 'Stanford University',
        website: 'https://thowell.github.io/',
      },
    ],
  };

  return content;
}
