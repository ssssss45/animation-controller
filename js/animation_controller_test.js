var animController
function addAnimation() {
	var temp=new lib.trener();
	animController = new animation_controller(
			{
				'hight' : 324,
				'width' : 315,
				'scale' : 1,
				'container': "animationContainer",
				'manifest' : [
					{src:"trener/images/Tr_1_head.png", id:"Tr_1_head"},
					{src:"trener/images/Tr_1_head_closed.png", id:"Tr_1_head_closed"},
					{src:"trener/images/Tr_1_rukav.png", id:"Tr_1_rukav"},
					{src:"trener/images/Tr_1_tors.png", id:"Tr_1_tors"},
					{src:"trener/images/Tr_C_Hand_1.png", id:"Tr_C_Hand_1"},
					{src:"trener/images/Tr_C_hand_2.png", id:"Tr_C_hand_2"},
					{src:"trener/images/Tr_C_hand_3.png", id:"Tr_C_hand_3"},
					{src:"trener/images/Tr_C_head.png", id:"Tr_C_head"},
					{src:"trener/images/Tr_C_tors.png", id:"Tr_C_tors"},
					{src:"trener/images/Tr_S_hand_1.png", id:"Tr_S_hand_1"},
					{src:"trener/images/Tr_S_hand_2.png", id:"Tr_S_hand_2"},
					{src:"trener/images/Tr_S_Hand_3.png", id:"Tr_S_Hand_3"},
					{src:"trener/images/Tr_S_hand_s.png", id:"Tr_S_hand_s"},
					{src:"trener/images/Tr_S_head.png", id:"Tr_S_head"},
					{src:"trener/images/Tr_S_tors.png", id:"Tr_S_tors"},
					{src:"trener/images/Tr_Z_hand_1.png", id:"Tr_Z_hand_1"},
					{src:"trener/images/Tr_Z_hand_2.png", id:"Tr_Z_hand_2"},
					{src:"trener/images/Tr_Z_hand_3.png", id:"Tr_Z_hand_3"},
					{src:"trener/images/Tr_Z_head.png", id:"Tr_Z_head"},
					{src:"trener/images/Tr_Z_tors.png", id:"Tr_Z_tors"}
				],
				'marks' : "lib.trener"
			});
}