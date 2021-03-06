import React from 'react';
import './StatsToplistCombatant.css';

const StatsToplistCombatant = ({combatant, combatantInfo}) => {
	 let info = '';
	 let text = '';
	
	 switch(combatantInfo){
		 case 'AGE':
			info = combatant.age;
			text = 'y/o';
			 break;
		 case 'WINS' :
			info = combatant.wins;
			text = 'wins';
			 break;
		 case 'LOSTS':
			 text = 'losts';
			 info = combatant.losts;
			 break;
		 default:
			 text = '%';
			 break;
	 }

	return(
		<div className="stats-combatant">
			 <div>
				<img src={combatant.img} alt="combatant" />
			 </div>
			<div>
				{combatant.name}
			</div>
			<div>
				{info} {text}
			</div>

		</div>
	)
}

export default StatsToplistCombatant;