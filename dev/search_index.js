var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = ReplicationLanteriRampini2023","category":"page"},{"location":"#ReplicationLanteriRampini2023","page":"Home","title":"ReplicationLanteriRampini2023","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for ReplicationLanteriRampini2023.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [ReplicationLanteriRampini2023]","category":"page"},{"location":"#ReplicationLanteriRampini2023.fb_dyn_unc-Tuple{Array{Float64}, ReplicationLanteriRampini2023.Parameters, Dict, Real, Any}","page":"Home","title":"ReplicationLanteriRampini2023.fb_dyn_unc","text":"fbdynunc(xx::Array{Float64}, Par::Parameters, Fun::Dict, q::Real, m::Any)\n\nReturns an array zz with the first-order conditions for new and old capital at the optimal allocation (see equations 38 and 39 in the paper) that will be used in the policy function iteration. The expression of these FOC is given explicitly as in the Matlab replication files. \n\nThe inputs correspond to an array with some level of new and old capital (xx), the parameter structure defined before with the associated dictionary with functions at the core of the setup (notably the policy function with its derivatives and production function with its derivatives), a price for capital q and another parameter m. In the next function (getDSshocksfb), m is defined as the matrix of expected payoffs.\n\n\n\n\n\n","category":"method"},{"location":"#ReplicationLanteriRampini2023.getDS_shocks_fb-Tuple{Matrix, Any, Array, Array, Number}","page":"Home","title":"ReplicationLanteriRampini2023.getDS_shocks_fb","text":"getDSshocksfb(Ps::Matrix,sgrid::Array, kNfb::Array,kU_fb::Array,q0::Number) \n\nThis function uses NLsolve to solve for the FOC found with fb_dyn_unc and deduce the level of old capital supplied and demanded optimally by firms of a given cohort. \n\nIts arguments are: Ps, the transition matrix of the idiosyncratic shock found usinf Rouwenhorst method; s_grid, the exponential grid of the shock; kN_fb and kU_fb the levels of new and old capital, and q0 an initial price of capital.  It returns a tuple with the demand and the supply of old capital. \n\n\n\n\n\n","category":"method"},{"location":"#ReplicationLanteriRampini2023.plot_results-Tuple{}","page":"Home","title":"ReplicationLanteriRampini2023.plot_results","text":"This function plots the results of the model if one wants.\n\n\n\n\n\n","category":"method"},{"location":"#ReplicationLanteriRampini2023.rouwen-Tuple{Int64, Float64, Float64, Float64}","page":"Home","title":"ReplicationLanteriRampini2023.rouwen","text":"Discretization method for a AR(1) process of the form z_t+1 = mu + rho z_t + u_t where u_t sim mathcalN(0 sigma)\n\nIt must be defined as:  rouwen(N:: number nodes, mu:: mean of the process, sigma:: sd of the innovation, rho:: persistence). N must be an integer and all other inputs are Floats. The paper considers N=2.\n\nReturns a tuple with the discretized grid for the realizations of the shock Z (a vector of size N), and its transition matrix Pi (size N times N).\n\n\n\n\n\n","category":"method"},{"location":"#ReplicationLanteriRampini2023.run_model-Tuple{}","page":"Home","title":"ReplicationLanteriRampini2023.run_model","text":"This offers a precise documentation of the function run_model() by describing step by step what happens when someone runs the function.\n\nFirst, We build a structure with the following parameters given as inputs for the model.     - A: technology/productivity parameter on the production function      - beta: discount rate      - rho: exit probability     - alpha: curvature of the production function (power on capital stock)      - theta: collaterazibility (if θ=0 there is no borrowing in the economy)     - delta_n: depreciation rate of new capital     - delta_u: depreciation rate of old capital     - gamma measure of first cohort of firms entering the economy     -\\rhos persistence idiosyncratic productivity shock s  AR(1)     -\\sigmas standard deviation innovation of the idiosyncratic productivity shock s     - s_grid grid for the idiosyncratic productivity shock s      - Ps probability transition matrix (will follow form Rouwenhorst method)     - w0 initial net worth for new entrants     - a elasticity of output with respect to capital     -\\epsilon CES elasticity of substitution     -\\chi0 Cost of raising equity parameters     -\\chi1``: Cost of raising equity parameters\n\nThen, we define a set of functions based on these parameters.\n- ``f(k) = Par.A * k^(Par.\\alpha)`` : this is a standard production function. It takes one input (capital stock k) and uses two of the parameters (the technology\nparameter A and the capital share of the production function ``\\alpha`` to compute the production output)\n- ``fk(k) = Par.\\alpha * Par.A * k^(Par.\\alpha - 1)``: this is the first derivative of the production function, with respect to the capital stock \nwhich is the only input of the production function\n- ``fkk(k) = Par.\\alpha * Par.A * (Par.\\alpha - 1) * k^(Par.\\alpha - 2)``: second derivative of the production function with repect to the capital stock\n- ``fkinv(fk) = (fk / (Par.\\alpha * Par.A))^(1 / (Par.\\alpha - 1))`` : inverse of the derivative function, useful for policy function iteration, the ouput is the\ncapital stock \n- ``g0(k_n, k_o) = Par.a^(1 / Par.\\epsilon) * k_n .^((Par.\\epsilon - 1) / Par.\\epsilon) + (1 - Par.a)^(1 / Par.\\epsilon) * (Par.\\gamma .* k_o) .^((Par.\\epsilon - 1) / Par.\\epsilon):``\ncomputes the constant elasticity of substitution bundle for new and old capital for the production function with stocks of old and new capital as inputs\n- ``g(k_n, k_o) = g0(k_n, k_o) .^(Par.\\epsilon / (Par.\\epsilon - 1))`` : this is the policy function which is an investment decision. Taking as inputs the old and new capital\nstocks, it gives as output the optimal amount of new capital to purchase at the next period\n- gn(k_n, k_o) = Par.a^(1 / Par.\\epsilon) * k_n .^((Par.\\epsilon - 1) / Par.\\epsilon - 1) * g0(k_n, k_o) .^(Par.\\epsilon / (Par.\\epsilon - 1) - 1) : \nthis is the derivative of the policy function with repect to the new capital, i.e. the marginal effect of investing in new capital on total capital in production\n- ``go(k_n, k_o) = Par.\\gamma * (1 - Par.a)^(1 / Par.\\epsilon) * (Par.\\gamma * k_o) .^((Par.\\epsilon - 1) / Par.\\epsilon - 1) * g0(k_n, k_o) .^(Par.\\epsilon / (Par.\\epsilon - 1) - 1)``:\nthis is the derivative of the policy function with repect to the old capital, i.e. the marginal effect of investing in old capital on total capital in production\n\nWe build a dictionary that contains both functions that we previously built and the parameters that enter these functions\nFun = Dict(\n        :g0 => g0,\n        :f => f,\n        :fk => fk,\n        :fkk => fkk,\n        :``\\epsilon => Par.\\espilon``,\n        :a => Par.a,\n        :``\\gamma => Par.\\gamma``,\n        :g => g,\n        :gn => gn,\n        :go => go\n    )\n\n    Then,  new parameters:\n    ``\\xi_grid1`` : only useful for the competitive equilibrium\n    ``\\xipr_grid0`` : only useful for the competitive equilibrium\n    kU : matrix that gives values of old capital on the path to first best\n    kN : matrix that gives values of new capital on the path to first best\n    qstar : first-best valuation of old capital  \n    damp : dampening parameter \n    ``diff_\\xi`` : only useful for the competitive equilibrium\n    ``tol_\\xi`` : tolerance level when looking for the optimal price\n    tol_q : tolerance level when looking for the optimal price\n    ``maxiter_\\xi`` : only useful for the competitive equilibrium\n    maxiter_q : maximum number of iterations when computing the optimal price\n\n    Again, we define a new set of parameters which will be our initial parameters, these are the one used originally by the authors of the paper as these parameters\n    fasten convergence:\n    q0 = 0.54\n    kU0 = ones(50,2) .* [16 29]\n    kN0 = ones(50,2) .* [16 29]\n    kU = kU0\n    kN = kN0\n\n    Finally, we set these parameters at their initial value before running the loop around prices to find optimal prices\n\nxd : will be the distance iterq : will defini the number of iterations already done inside the loop q1 : initial minimum price value q2 : initial maximum price value kNfb : vector of new capital values. There are two colums to signify the levels with each realization of the idiosyncratic shock. kUfb : vector of old capital values where (again) each column represent the realizations of the shock.  qvec : initital price vector for old capital, will give the vector of prices for old capital obtained through the iteration loop q3 : init price value\n\nThe loop aims to find the optimal price for old capital using policy function iteration.      The idea is to find the price such as demand and supply for the old capital are equal.     To obtain such values, we use the getDSshocksfb function from the PolicyFuncIterations file.\n\nFirst, we compute the difference between demand and supply of old capital for both the lowest possible price value (q1) and the highest one (q2).\nThe differences in these situations will be called respectively xd1 and xd2.\nThen, we will want to know towards which direction price should move. Indeed, if the difference is different from 0, there is no clearing between and supply\nand either the prices are too high or too low. \nThis is why we then build a new price q3 as a function of q1 and q2 and the differences obtained in each situation. This is built such as the price that\nappears as clearing the most the market has a more important role in building q3.\n\nIf the difference is the same in both cases (xd1=xd2), we just set q3 a bit below q1 as we cannot infer anything in such a situation.\nOtherwise, we apply a specific formula for q3 as mentioned before.\nThen, we compute demand and supply for this new value. If the difference xd3 is positive, it means demand and too high and prices were too low, then this is q1\nthat will be changed by q3, i.e. we increase the lowest possible price. Conversly, if this is negative, demand is too low (or supply too high) and we simply diminish the highest possible price by\nreplacing q2 by q3.\nHowever, if xd (which takes the value of xd3 at each period) reaches a low enough value, we consider that we have become close enough to the true price \nof the first best and stop the loop.\n\nFinally, we compute some specific values such as the total capital at first best and the subsequent output in the economy.\nAll the subsequent computations do not really matter in our situation, as we are in the first-best situation and that there are not different \"states\"\nat which values such as capital would differ.\n\n\n\n\n\n","category":"method"}]
}
