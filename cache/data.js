export const docs = [
  {
    title: 'Introduction',
    children: [
      {
        content:
          "\n# Altro.jl Documention\n\n<br />\n\n## Overview\n\nALTRO (Augmented Lagrangian TRajectory Optimizer) is a fast solver for solving\nnonlinear, constrained trajectory optimization problems of the form:\n\n<MathJax>\n\nLift($L$) can be determined by Lift Coefficient ($C_L$) like the following\nequation.\n\n$$\nL = \\frac{1}{2} \\rho v^2 S C_L\n$$\n\nGiven a **formula** below\n\n$$s = ut + \\\\frac{1}{2}at^{2}$$\n\nCalculate the value of $s$ when $u = 10 $$\\\\frac{m}{s}$ and $a = 2\\\\frac{m}{s^{2}}$ at $t = 1s$$\n\n</MathJax>\n\nwhere `\\mathcal{K}` is either the negative orthant or the second-order cone.\n\nALTRO uses iterative LQR (iLQR) as the primary solver, which is used to generate\nlocally-optimal linear feedback policies and satisfy the nonlinear dynamics\nconstraints. Generic stage-wise state and control constraints are handled using\nan augmented Lagrangian.\n\nOnce the augmented Lagrangian solver has converged to coarse tolerances, ALTRO\ncan switch to an active-set projected Newton phase that provides fast convergence to\ntight constraint satisfaction.\n\nALTRO has demonstrated state-of-the-art performance for convex conic MPC problems,\nbeating SOCP solvers such as Mosek, ECOS, and SCS. For quadratic MPC problems,\nALTRO has performance on-par or better than OSQP.\n\nALTRO builds off the interfaces provided by\n[TrajectoryOptimization.jl](https://github.com/RoboticExplorationLab/TrajectoryOptimization.jl) and\n[RobotDynamics.jl](https://github.com/RoboticExplorationLab/RobotDynamics.jl).\nPlease see the documentation for those packages for a more in-depth treatment\nof defining dynamics models and setting up trajectory optimization problems.\nThe purpose of this documentation is to provide insight into the ALTRO\nalgorithm, it's Julia implementation, and the options this solver provides.\n",
        data: {
          slug: 'introduction/overview',
          title: 'Overview',
          fullPath: '/Users/alyssariah/Documents/altro.org/content/docs/introduction/overview.mdx',
        },
        isEmpty: false,
        excerpt: '',
      },
      {
        content:
          '\n## Key Features <br/>\n\n<br />\n\n&nbsp;\n\n- State-of-the-art performance for both convex (linear dynamics) and nonlinear trajectory optimization problems\n- Convenient interface for dynamics and problem definition via [TrajectoryOptimization.jl](https://github.com/RoboticExplorationLab/TrajectoryOptimization.jl) and [RobotDynamics.jl](https://github.com/RoboticExplorationLab/RobotDynamics.jl).\n- Supports generic nonlinear state and control constraints at each time step.\n- Supports second-order-cone programs (SOCPs).\n- Allows initialization of both state and control trajectories.\n- Supports integration up to 4th-order Runge-Kutta methods. Higher-order methods are possible but not yet implemented.\n- Supports implicit integration schemes such as implicit midpoint.\n- Supports optimization on the space of 3D rotations.\n- Provides convenient methods for warm-starting MPC problems.\n- Provides efficient methods for auto-differentiation of costs, constraints, and dynamics via [ForwardDiff.jl](https://github.com/JuliaDiff/ForwardDiff.jl) and\n  [FiniteDiff.jl](https://github.com/JuliaDiff/FiniteDiff.jl).\n',
        data: {
          slug: 'introduction/key-features',
          title: 'Key Features',
          fullPath:
            '/Users/alyssariah/Documents/altro.org/content/docs/introduction/key-features.mdx',
        },
        isEmpty: false,
        excerpt: '',
      },
      {
        content:
          "\n\n## Installation\nAltro.jl can be installed via the Julia package manager. Within the Julia\nREPL:\n```\n] # activate the package manager\n(v1.5) pkg> add Altro \n```\nA specific version can be specified using\n```\n(v1.5) pkg> add Altro@0.5\n```\nOr you can check out the main branch with\n```\n(v1.5) pkg> add Altro#main\n```\nLastly, if you want to clone the repo into your `.julia/dev/` directory for development, you can use\n```\n(v1.5) pkg> dev Altro \n```\n\nThis will automatically add all package dependencies (see [`Project.toml`](https://github.com/RoboticExplorationLab/Altro.jl/blob/master/Project.toml)).\nIf you want to explicitly use any of these dependencies (such as [RobotDynamics.jl](https://github.com/RoboticExplorationLab/RobotDynamics.jl)), \nyou'll need to individually add those packages to your environment via the package manager.",
        data: {
          slug: 'introduction/installation',
          title: 'Installation',
          fullPath:
            '/Users/alyssariah/Documents/altro.org/content/docs/introduction/installation.mdx',
        },
        isEmpty: false,
        excerpt: '',
      },
    ],
  },
  {
    content:
      "\n# Getting Started \n\nSetting up and solving a problem with ALTRO is very straight-forward. Let's\nwalk through an example of getting a Dubins car to drive through some circular\nobstacles.\n\n## 1. Load the packages\nOur first step is to load the required packages. Since we need to define our\ndynamics model, we need [RobotDynamics.jl](https://github.com/RoboticExplorationLab/RobotDynamics.jl), and we need [TrajectoryOptimization.jl](https://github.com/RoboticExplorationLab/TrajectoryOptimization.jl) to define our problem. We'll \nalso import [StaticArrays.jl](https://github.com/JuliaArrays/StaticArrays.jl) for \nfast, allocation-free matrix methods, and the `LinearAlgebra` module. To avoid \nhaving to type `TrajectoryOptimization` and `RobotDynamics` all the time, we also\ncreate some convenient aliases.\n\n```@example car\nusing Altro\nusing TrajectoryOptimization\nusing RobotDynamics\nusing StaticArrays, LinearAlgebra\nconst TO = TrajectoryOptimization\nconst RD = RobotDynamics\nnothing # hide\n```\n\n## 2. Set up the dynamics model\nWe now define our dynamics model using RobotDynamics.jl. We define a new type `Car` \nthat inherits from `RobotDynamics.ContinuousDynamics`. We can store any of our model \nparameters in this type. After defining the state and control dimensions and the \ncontinuous dynamics, we're done defining our model. Integration of the dynamics\nand the dynamics derivatives can be done automatically.\n\n```@example car\nusing ForwardDiff  # needed for @autodiff\nusing FiniteDiff   # needed for @autodiff\n\nRD.@autodiff struct DubinsCar <: RD.ContinuousDynamics end\nRD.state_dim(::DubinsCar) = 3\nRD.control_dim(::DubinsCar) = 2\n\nfunction RD.dynamics(::DubinsCar,x,u)\n    ẋ = @SVector [u[1]*cos(x[3]),\n                  u[1]*sin(x[3]),\n                  u[2]]\nend\n```\n\nThe code above is the minimal amount of code we need to write to define our dynamics.\nWe can also define in-place evaluation methods and an analytic Jacobian:\n\n```@example car\nfunction RD.dynamics!(::DubinsCar, xdot, x, u)\n    xdot[1] = u[1] * cos(x[3])\n    xdot[2] = u[1] * sin(x[3])\n    xdot[3] = u[2] \n    return nothing\nend\n\nfunction RD.jacobian!(::DubinsCar, J, xdot, x, u)\n    J .= 0\n    J[1,3] = -u[1] * sin(x[3])\n    J[1,4] = cos(x[3])\n    J[2,3] = u[1] * cos(x[3])\n    J[2,4] = sin(x[3])\n    J[3,5] = 1.0\n    return nothing\nend\n\n# Specify the default method to be used when calling the dynamics\n#   options are `RD.StaticReturn()` or `RD.InPlace()`\nRD.default_signature(::DubinsCar) = RD.StaticReturn()\n\n# Specify the default method for evaluating the dynamics Jacobian\n#   options are `RD.ForwardAD()`, `RD.FiniteDifference()`, or `RD.UserDefined()`\nRD.default_diffmethod(::DubinsCar) = RD.UserDefined()\n```\n\n!!! tip\n    We use `RobotDynamics.@autodiff` to automatically define methods to evaluate \n    the Jacobian of our dynamics function. See the RobotDynamics documentation \n    for more details. Note that we have to include the FiniteDiff and ForwardDiff\n    packages to use this method.\n\n## 3. Set up the objective\nOnce we've defined the model, we can now start defining our problem. Let's start\nby defining the discretization:\n```@example car\nmodel = DubinsCar()\ndmodel = RD.DiscretizedDynamics{RD.RK4}(model)\nn,m = size(model)    # get state and control dimension\nN = 101              # number of time steps (knot points). Should be odd.\ntf = 3.0             # total time (sec)\ndt = tf / (N-1)      # time step (sec)\nnothing  # hide\n```\nNote that we need a discrete version of our dynamics model, which we can obtain using \nthe `RobotDynamics.DiscretizedDynamics` type. This type creates a \n`RobotDynamics.DiscreteDynamics` type from a `RobotDynamics.ContinuousDynamics` type \nusing a supplied integrator. Here we use the 4th-order explicit Runge-Kutta method\nprovided by RobotDynamics.jl.\n\nNow we specify our initial and final conditions:\n```@example car\nx0 = SA_F64[0,0,0]   # start at the origin\nxf = SA_F64[1,2,pi]  # goal state\nnothing  # hide\n```\n\nFor our objective, let's define a quadratic cost function that penalizes distance from \nthe goal state:\n```@example car\nQ  = Diagonal(SA[0.1,0.1,0.01])\nR  = Diagonal(SA[0.01, 0.1])\nQf = Diagonal(SA[1e2,1e2,1e3])\nobj = LQRObjective(Q,R,Qf,xf,N)\nnothing # hide\n```\n\n## 4. Add the constraints\nNow let's define the constraints for our problem. We're going to bound the workspace of the robot, and add two obstacles. We start by defining a `ConstraintList`, which \nis going to hold all of the constraints and make sure they're dimensions are \nconsistent. Here we add a goal constraint at the last time step, a workspace \nconstraint, and then the circular obstacle constraint.\n```@example car\ncons = ConstraintList(n,m,N)\n\n# Goal constraint\ngoal = GoalConstraint(xf)\nadd_constraint!(cons, goal, N)\n\n# Workspace constraint\nbnd = BoundConstraint(n,m, x_min=[-0.1,-0.1,-Inf], x_max=[5,5,Inf])\nadd_constraint!(cons, bnd, 1:N-1)\n\n# Obstacle Constraint\n#   Defines two circular obstacles:\n#   - Position (1,1) with radius 0.2\n#   - Position (2,1) with radius 0.3\nobs = CircleConstraint(n, SA_F64[1,2], SA_F64[1,1], SA[0.2, 0.3])\nadd_constraint!(cons, bnd, 1:N-1)\nnothing # hide\n```\n\n## 5. Define the problem\nWith the dynamics model, discretization, objective, constraints, and initial condition\ndefined, we're ready to define the problem, which we do with \n`TrajectoryOptimization.Problem`. \n```@example car\nprob = Problem(model, obj, x0, tf, xf=xf, constraints=cons)\nnothing # hide\n```\nInitialization is key when nonlinear optimization problems with gradient-based methods. \nSince this problem is pretty easy, we'll just initialize it with small random noise \non the controls and then simulate the system forward in time.\n```@example car\ninitial_controls!(prob, [@SVector rand(m) for k = 1:N-1])\nrollout!(prob)   # simulate the system forward in time with the new controls\n```\n\n## 6. Intialize the solver\nWith the problem now defined, we're ready to start using Altro.jl (everything up to\nthis point used only RobotDynamics.jl or TrajectoryOptimization.jl). All we need to\ndo is create an `ALTROSolver`.\n```@example car\nsolver = ALTROSolver(prob)\nnothing # hide\n```\n\n### Setting Solver Options\nWe can set solver options via keyword arguments to the constructor, or by passing in \na `SolverOptions` type:\n```@example car\n# Set up solver options\nopts = SolverOptions()\nopts.cost_tolerance = 1e-5\n\n# Create a solver, adding in additional options\nsolver = ALTROSolver(prob, opts, show_summary=false)\nnothing # hide\n```\nYou can also use the [`set_options!`](@ref) method on a solver once it's created.\n\n## 7. Solve the problem\nWith the solver initialized, we can now solve the problem with a simple call to \n`solve!`:\n```@example car\nsolve!(solver)\nnothing # hide\n```\n\n## 8. Post-analysis\n\n### Checking solve status\nOnce the solve is complete, we can look at a few things. The first is to check if the\nsolve is successful:\n```@example car\nstatus(solver)\n```\nWe can also extract some more information\n```@example car\nprintln(\"Number of iterations: \", iterations(solver))\nprintln(\"Final cost: \", cost(solver))\nprintln(\"Final constraint satisfaction: \", max_violation(solver))\n```\n\n### Extracting the solution\nWe can extract the state and control trajectories, which are returned as vectors of\n`SVector`s:\n```@example car\nX = states(solver)     # alternatively states(prob)\nU = controls(solver)   # alternatively controls(prob)\n```\nIf you prefer to work with matrices, you can convert them easily:\n```@example car\nXm = hcat(Vector.(X)...)  # convert to normal Vector before concatenating so it's fast\nUm = hcat(Vector.(U)...)\n```\n\n\n!!! tip\n    Converting a matrix into a vector of vectors is also very easy:\n    ```julia\n    X = [col for col in eachcol(Xm)]\n    ```\n    Or if you want static vectors:\n    ```julia\n    X = [SVector{n}(col) for col in eachcol(Xm)]\n    ```\n\n### Extracting the final feedback gains \nSince ALTRO uses iLQR, the solver computes a locally optimal linear feedback policy\nwhich can be useful for tracking purposes. We can extract it from the internal \n`Altro.iLQRSolver`:\n```@example car\nilqr = Altro.get_ilqr(solver)\nK = ilqr.K  # feedback gain matrices\nd = ilqr.d  # feedforward gains. Should be small.\n```\n\n### Additional solver stats\nWe can extract more detailed information on the solve from [`SolverStats`](@ref)\n```@example car\nAltro.stats(solver)\nnothing  # hide\n```\nThe most relevant fields are the `cost`, `c_max`, and `gradient`.\nThese give the history of these values for each iteration. The `iteration_outer` can\nalso be helpful to know which iterations were outer loop (augmented Lagrangian) \niterations. The `tsolve` field gives the total solve time in milliseconds.",
    data: {
      slug: 'getting-started',
      title: 'Getting Started',
      fullPath: '/Users/alyssariah/Documents/altro.org/content/docs/getting-started.mdx',
      index: 1,
    },
    isEmpty: false,
    excerpt: '',
  },
  {
    title: 'Solver',
    children: [
      {
        content:
          '\n# Solver Options\n\n## Solver Statistics\n\nALTRO logs intermediate values during the course of the solve. These values are all\nstored in the [`SolverStats`](@ref) type, accessible via `solver.stats` or `Altro.stats(solver)`. This currently stores the following information:\n\n| Field              | Description                                                                      |\n| ------------------ | -------------------------------------------------------------------------------- |\n| `iterations`       | Total number of iterations                                                       |\n| `iterations_outer` | Number of outer loop (Augmented Lagrangian) iterations                           |\n| `iterations_pn`    | Number of projected newton iterations                                            |\n| `iteration`        | Vector of iteration number                                                       |\n| `iteration_outer`  | Vector of outer loop iteration number                                            |\n| `cost`             | Vector of costs                                                                  |\n| `dJ`               | Change in cost                                                                   |\n| `c_max`            | Maximum constrained violation                                                    |\n| `gradient`         | Approximation of dual optimality residual (2-norm of gradient of the Lagrangian) |\n| `penalty_max`      | Maximum penalty parameter                                                        |\n\nThe other fields are used interally by the solver and not important to the end user.\n\nThe vector fields of the `SolverStats` type can be converted to a dictionary via `Dict(stats::SolverStats)`,\nwhich can then be cast into a tabular format such as `DataFrame` from DataFrames.jl.\n',
        data: {
          slug: 'solver/solver-statistics',
          title: 'Solver Statistics',
          fullPath:
            '/Users/alyssariah/Documents/altro.org/content/docs/solver/solver-statistics.mdx',
        },
        isEmpty: false,
        excerpt: '',
      },
      {
        content:
          '\n## Solver Options\n\nLike any nonlinear programming solver, ALTRO comes with a host of solver options.\nWhile the default values yield good/acceptable performance on many problem, extra\nperformance can always be gained by tuning these parameters. In practice, there are\nonly a few parameters that need to be tuned. See the [AL-iLQR Tutorial](https://bjack205.github.io/papers/AL_iLQR_Tutorial.pdf) for more details.\n\nThe ALTRO solver is actually a composition of several different solvers with\ntheir own options. Early versions of Altro.jl required the user to manipulate\na rather confusing heirarchy of solver options. Newer versions of Altro.jl\nprovide a single options struct that dramatically simplifies setting and\nworking with the solver parameters.\n\n### Setting Solver Options\n\nSolver options can be specified when the solver is instantiated or afterwards using\nthe `set_options!` command. If we have a previously constructed `Problem`, this looks\nlike\n\n```julia\nsolver = ALTROSolver(prob, verbose=1, constraint_tolerance=1e-3, square_root=true)\n```\n\nAlternatively, solver options can be set using the `set_options!` command after the\nsolver has been instantiated:\n\n```julia\nset_options!(solver, reset_duals=true, penalty_initial=100, penalty_scaling=50)\n```\n\n### Querying Solver Options\n\nThe options struct for the `ALTROSolver` can be directly accessed via `solver.opts` or\n`Altro.options(solver)`. Options can be directly set or retrieved from this mutable\nstruct.\n',
        data: {
          slug: 'solver/solver-options',
          title: 'Solver Options',
          fullPath: '/Users/alyssariah/Documents/altro.org/content/docs/solver/solver-options.mdx',
        },
        isEmpty: false,
        excerpt: '',
      },
      {
        content:
          '\n## List of Options\n\nFor convenience, we provide a list of options in the ALTRO solver, along with a brief\ndescription:\n\n| Option                            | Description                                                                                                                                                                                                                                                                                         | Importance  | Default |\n| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |\n| `constraint_tolerance`            | All constraint violations must be below this value.                                                                                                                                                                                                                                                 | High        | `1e-6`  |\n| `cost_tolerance`                  | The difference in costs between subsequent iterations must be below this value.                                                                                                                                                                                                                     | High        | `1e-4`  |\n| `cost_tolerance_intermediate`     | Cost tolerance for intermediate iLQR solves. Can speed up convergence by increase to 10-100x the `cost_tolerance`.                                                                                                                                                                                  | Med         | `1e-4`  |\n| `gradient_tolerance`              | Tolerance for 2-norm of primal optimality residual.                                                                                                                                                                                                                                                 | Low         | `1`     |\n| `gradient_tolerance_intermediate` | Primal optimality residual tolerance for intermediate solve.                                                                                                                                                                                                                                        | Low         | `10`    |\n| `iterations_inner`                | Max iLQR iterations per iLQR solve.                                                                                                                                                                                                                                                                 | Med         | `300`   |\n| `dJ_counter_limit`                | Max number of times iLQR can fail to make progress before exiting.                                                                                                                                                                                                                                  | Low         | `10`    |\n| `square_root`                     | Enable the square root backward pass for improved numerical conditioning (WIP).                                                                                                                                                                                                                     | Med         | `false` |\n| `line_search_lower_bound`         | Lower bound for Armijo line search.                                                                                                                                                                                                                                                                 | Low         | `1e-8`  |\n| `line_search_upper_bound`         | Upper bound for Armijo line search.                                                                                                                                                                                                                                                                 | Low         | `10.0`  |\n| `iterations_linesearch`           | Max number of backtracking steps in iLQR line search                                                                                                                                                                                                                                                | Low         | 20      |\n| `max_cost_value`                  | Maximum cost value. Will terminate solve if cost exeeds this limit.                                                                                                                                                                                                                                 | Low         | `1e8`   |\n| `max_state_value`                 | Maximum value of any state. Will terminate solve if any state exeeds this limit.                                                                                                                                                                                                                    | Low         | `1e8`   |\n| `max_control_value`               | Maximum value of any control. Will terminate solve if any control exeeds this limit.                                                                                                                                                                                                                | Low         | `1e8`   |\n| `static_bp`                       | Enable the static backward pass. Only advisable for state + control dimensions < 20. Turn off if compile time is exessive.                                                                                                                                                                          | Low         | `true`  |\n| `save_S`                          | Save the intermediate cost-to-go expansions in the iLQR backward pass.                                                                                                                                                                                                                              | Low         | `false` |\n| `bp_reg`                          | Enable iLQR backward pass regularization (WIP).                                                                                                                                                                                                                                                     | Med         | `false` |\n| `bp_reg_initial`                  | Initial backward pass regularization.                                                                                                                                                                                                                                                               | Low         | `0.0`   |\n| `bp_reg_increase_factor`          | Multiplicative factor by which the regularization is increased.                                                                                                                                                                                                                                     | Low         | `1.6`   |\n| `bp_reg_max`                      | Maximum regularization.                                                                                                                                                                                                                                                                             | Low         | `1e8`   |\n| `bp_reg_min`                      | Minimum regularization.                                                                                                                                                                                                                                                                             | Low         | `1e-8`  |\n| `bp_reg_fp`                       | Amount of regularization added when foward pass fails                                                                                                                                                                                                                                               | Low         | `10.0`  |\n| `penalty_initial`                 | Initial penalty term on all constraints. Set low if the unconstrained solution is a good approximate solution to the constrained problem, and high if the initial guess provided is a good esimate. If `NaN` uses values in each constraint param, which defaults to `1.0`.                         | `Very High` | `NaN`   |\n| `penalty_scaling`                 | Multiplicative factor by which the penalty is increased each outer loop iteration. High values can speed up convergence but quickly lead to poor numerical conditioning on difficult problems. Start with small values and then increase.If `NaN` defaults to `10` in the per-constraint parameter. | `Very High` | `NaN`   |\n| `iterations_outer`                | Max number of outer loop (Augmented Lagrangian) iterations.                                                                                                                                                                                                                                         | Med         | `30`    |\n| `verbose_pn`                      | Turn on printing in the projected newton solver.                                                                                                                                                                                                                                                    | Low         | `false` |\n| `n_steps`                         | Maximum number of projected newton steps.                                                                                                                                                                                                                                                           | Low         | `2`     |\n| `projected_newton_tolerance`      | Constraint tolerance at which the solver will exit the Augmented Lagrangian solve and start the projected newton solve. Typically `sqrt(constraint_tolerance)`                                                                                                                                      | High        | `1e-3`  |\n| `active_set_tolerance_pn`         | Tolerance for the active constraints during the projected newton solve. Includes some barely satisfied constraints into the active set. Can fix singularity issues during projected newton solve.                                                                                                   | Med         | `1e-3`  |\n| `multiplier_projected`            | Enable updating the dual variables during the projected newton solve. Also provides a calculation of the optimality residual in the stats output.                                                                                                                                                   | Low         | `true`  |\n| `ρ_chol`                          | Regularization on the projected newton Cholesky solve.                                                                                                                                                                                                                                              | Med         | `1e-2`  |\n| `ρ_primal`                        | Regularization on the primal variables during the projected newton solve. Required if cost Hessian is positive-semi-definite.                                                                                                                                                                       | Low         | `1e-8`  |\n| `ρ_dual`                          | Regularization on the dual variables during the multiplier projection step.                                                                                                                                                                                                                         | Low         | `1e-8`  |\n| `r_threshold`                     | Improvement ratio threshold for projected newton solve. If the ratio of constraint violations between subsequent steps is less than this value, it will update the cost and constraint expansions                                                                                                   | Low         | `1.1`   |\n| `projected_newton`                | Enable projected newton solve. If enabled, `projected_newton_solve` is used as the `constraint_tolerance` for the AL-iLQR solve. Projected newton solve is still a WIP and not very robust.                                                                                                         | High        | `true`  |\n| `iterations`                      | Max number of total iterations (iLQR + projected newton).                                                                                                                                                                                                                                           | Med         | 1000    |\n| `verbose`                         | Controls output during solve. `0` is zero output, `1` outputs AL iterations, and `2` outputs both AL and iLQR iterations                                                                                                                                                                            | Low         | `0`     |\n',
        data: {
          slug: 'solver/options-list',
          title: 'List of Options',
          fullPath: '/Users/alyssariah/Documents/altro.org/content/docs/solver/options-list.mdx',
        },
        isEmpty: false,
        excerpt: '',
      },
    ],
  },
  {
    content:
      '\n# Advanced Options\n\n## Infeasible Start\n\nStandard indirect methods such as iLQR cannot be initialized with a state trajectory\nsince they are always dynamically feasible. However, for some problems an initial\nstate trajectory is very informative and easy to generate, while supplying an\ninitial guess for the controls is extremely difficult. For example, consider a\nquadrotor flying around some obstacles. Guessing a good path, or even the velocities,\nwould be pretty easy, but supplying the control sequence to generate that path\nis nearly as hard as just solving the entire trajectory optimization problem.\n\nALTRO allows for "infeasible" starts by augmenting the discrete dynamics so that\nthey become fully actuated, i.e. for any state we can provide a control that will\nacheive it. This increases the size of the control dimension by `n`, the number of\nstates in the original problem, so the problem becomes more expensive to solve.\n\nWe specify that we want an infeasible start by passing the `infeasible` flag to\nthe ALTRO constructor:\n\n```@example infeasible\nusing Altro\nprob,opts = Problems.DubinsCar(:escape)\nsolver = ALTROSolver(prob, opts, infeasible=true, R_inf=0.1)\nnothing  # hide\n```\n\nwhere `R_inf` is the norm of the regularizer on the additional controls. Notice how\nthe new control dimension is 5, since the original control and state dimensions were\n2 and 3.\n\nThe initial state trajectory can be provided using one of\n\n```julia\ninitial_states!(solver, X0)\ninitial_trajectory!(solver, Z0)\n```\n\nwhere `X0::Union{SVector, Matrix, Vector{<:StaticVector}}` and\n`Z0::SampledTrajectory`.\n\n```@docs\nInfeasibleModel\nInfeasibleConstraint\ninfeasible_trajectory\n```\n\n## Using Implicit Integrators\n\nBy leveraging the functionality of RobotDynamics.jl, Altro can easily solve problems\nusing implicit integrators like implicit midpoint, which as a symplectic integrator\nhas energy-conserving behaviors and also preserves any implicit norms in the dynamics\n(such as the norm on a quaternion representing rotations). The following example\nshows how to use an implicit integrator:\n\n```@example implicit\nusing RobotZoo: Cartpole\nusing RobotDynamics\nusing TrajectoryOptimization\nusing Altro\nusing LinearAlgebra\nconst RD = RobotDynamics\n\nmodel = Cartpole()\ndmodel = RD.DiscretizedDynamics{RD.ImplicitMidpoint}(model)\n\n# Temporary "hack" to make sure it doesn\'t try to use the `UserDefined` method\nRD.default_diffmethod(::Cartpole) = RD.ForwardAD()\n\ntf = 2.0\nN = 51\nn,m = RD.dims(model)\nx0 = [0,0,0,0.]\nxf = [0,pi,0,0]\n\nQ = Diagonal(fill(1.0, n))\nR = Diagonal(fill(0.1, m))\nQf = Q*(N-1)\nobj = LQRObjective(Q,R,Qf,xf,N)\n\nprob = Problem(dmodel, obj, x0, tf)\n\nsolver = ALTROSolver(\n    prob,\n    dynamics_diffmethod=RD.ImplicitFunctionTheorem(RD.ForwardAD())\n)\nnothing  # hide\n```\n\nThe key here is to specify the solver option `dynamics_diffmethod` to be\n`RobotDynamics.ImplicitFunctionTheorem()` which takes another `RobotDynamics.DiffMethod`\nas an argument, which specified how the Jacobians of the dynamics residual should be\ncomputed. The implicit function theorem then uses the partial derivatives to compute\nthe Jacobians with respect to the next state, which are the Jacobians requried by\nalgorithms like iLQR.\n\n## Disabling Octavian\n\nBy default, Altro.jl uses\n[Octavian.jl](https://github.com/JuliaLinearAlgebra/Octavian.jl) for matrix\nmultiplication. This typically yields very good runtime performance but can take a\nwhile to compile the first time. If you want to disable the use of Octavian,\nset the environment variable `ALTRO_USE_OCTAVIAN = false` prior to using Altro.\nIf Altro has already precompiled, you\'ll need to delete the compiled cache using\n\n```\nrm -rf ~/.julia/compiled/v1.x/Altro/*\n```\n\nand then when you enter `using Altro` in the Julia REPL you should see it print a\nmessage that it\'s precompiling. You can check to see if Altro is using Octavian\nby checking the `Altro.USE_OCTAVIAN` variable in the Altro module.\n',
    data: {
      slug: 'advanced-options',
      title: 'Advanced Options',
      fullPath: '/Users/alyssariah/Documents/altro.org/content/docs/advanced-options.mdx',
      index: 3,
    },
    isEmpty: false,
    excerpt: '',
  },
  {
    content:
      '\n# Altro.jl API\n\n```@meta\nCurrentModule = Altro\n```\n\n```@contents\nPages = ["api.md"]\n```\n\nThis page provides the docstrings for the most common methods that the user may\nwork with.\n\n## Solvers\n\n### Types\n\n```@docs\nALTROSolver\nALSolver\niLQRSolver\nProjectedNewtonSolver\n```\n\n### Methods\n\n```@docs\nbackwardpass!\nforwardpass!\nrecord_iteration!\n```\n',
    data: {
      slug: 'api',
      title: 'API',
      fullPath: '/Users/alyssariah/Documents/altro.org/content/docs/api.mdx',
      index: 4,
    },
    isEmpty: false,
    excerpt: '',
  },
];
