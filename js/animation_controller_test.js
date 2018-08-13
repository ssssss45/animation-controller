window.addEventListener('load', loadAnims );
var animController;
function loadAnims()
{
	animController = new animation_controller(
	{
		animationContainer: "animationContainer",
	animationAssets:
	 	[
			{
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
				'animations': 
				[
					{
						name: "lib.Trener",
						width: 310,
						height: 286
					}
				],
				'jsLink' : 'trener/trener.js'
			},
			{
				'manifest' : [
					{src:"scarfman/images/Golova.png", id:"Golova"},
					{src:"scarfman/images/Golova_2.png", id:"Golova_2"},
					{src:"scarfman/images/GolovaB.png", id:"GolovaB"},
					{src:"scarfman/images/KidtSharf_R.png", id:"KidtSharf_R"},
					{src:"scarfman/images/KidtSharf_R_White.png", id:"KidtSharf_R_White"},
					{src:"scarfman/images/KistSarf_L.png", id:"KistSarf_L"},
					{src:"scarfman/images/KistSarf_LWhite.png", id:"KistSarf_LWhite"},
					{src:"scarfman/images/Ladon_L.png", id:"Ladon_L"},
					{src:"scarfman/images/Ladon_R.png", id:"Ladon_R"},
					{src:"scarfman/images/Ladon_RWhite.png", id:"Ladon_RWhite"},
					{src:"scarfman/images/Ladon_Tyl.png", id:"Ladon_Tyl"},
					{src:"scarfman/images/Lico.png", id:"Lico"},
					{src:"scarfman/images/Mayka.png", id:"Mayka"},
					{src:"scarfman/images/Mayka_2.png", id:"Mayka_2"},
					{src:"scarfman/images/Plecho_L.png", id:"Plecho_L"},
					{src:"scarfman/images/Plecho_L_2.png", id:"Plecho_L_2"},
					{src:"scarfman/images/Plecho_R.png", id:"Plecho_R"},
					{src:"scarfman/images/Plecho_R_2.png", id:"Plecho_R_2"},
					{src:"scarfman/images/Predpleche_L.png", id:"Predpleche_L"},
					{src:"scarfman/images/Predpleche_L_2.png", id:"Predpleche_L_2"},
					{src:"scarfman/images/Predpleche_R.png", id:"Predpleche_R"},
					{src:"scarfman/images/Predpleche_R_2.png", id:"Predpleche_R_2"},
					{src:"scarfman/images/Sharf1.png", id:"Sharf1"},
					{src:"scarfman/images/Sharf1_White.png", id:"Sharf1_White"},
					{src:"scarfman/images/Sharf2.png", id:"Sharf2"},
					{src:"scarfman/images/Sharf2_White.png", id:"Sharf2_White"},
					{src:"scarfman/images/Sharf3.png", id:"Sharf3"},
					{src:"scarfman/images/Sharf3White.png", id:"Sharf3White"},
					{src:"scarfman/images/Sharf4.png", id:"Sharf4"},
					{src:"scarfman/images/Sharf4White.png", id:"Sharf4White"},
					{src:"scarfman/images/Sheya.png", id:"Sheya"}
				],
				'animations': 
				[
					{
						name: 'lib.Scarfman',
						width: 259,
						height: 142
					},
					{
						name: 'lib.ScarfmanWhite',
						width: 259,
						height: 142
					}
				],
				'jsLink' : 'scarfman/scarfman.js'
			},
			{
				'manifest' : [
					{src:"players/images/_1_ShoeLRed.png", id:"_1_ShoeLRed"},
					{src:"players/images/_1_ShoeRRed.png", id:"_1_ShoeRRed"},
					{src:"players/images/_2_HandL1.png", id:"_2_HandL1"},
					{src:"players/images/_2_HandL1_Red.png", id:"_2_HandL1_Red"},
					{src:"players/images/_2_HandL2.png", id:"_2_HandL2"},
					{src:"players/images/_2_HandL3.png", id:"_2_HandL3"},
					{src:"players/images/_2_HandR1.png", id:"_2_HandR1"},
					{src:"players/images/_2_HandR1_Red.png", id:"_2_HandR1_Red"},
					{src:"players/images/_2_HandR2.png", id:"_2_HandR2"},
					{src:"players/images/_2_HandR3.png", id:"_2_HandR3"},
					{src:"players/images/_2_Head.png", id:"_2_Head"},
					{src:"players/images/_2_LegL1.png", id:"_2_LegL1"},
					{src:"players/images/_2_LegL2.png", id:"_2_LegL2"},
					{src:"players/images/_2_LegR1.png", id:"_2_LegR1"},
					{src:"players/images/_2_LegR2.png", id:"_2_LegR2"},
					{src:"players/images/_2_ShoeL.png", id:"_2_ShoeL"},
					{src:"players/images/_2_ShoeL_White.png", id:"_2_ShoeL_White"},
					{src:"players/images/_2_ShoeR.png", id:"_2_ShoeR"},
					{src:"players/images/_2_ShoeR_White.png", id:"_2_ShoeR_White"},
					{src:"players/images/_2_Torso.png", id:"_2_Torso"},
					{src:"players/images/_2_Torso_Red.png", id:"_2_Torso_Red"},
					{src:"players/images/_3_HandL1.png", id:"_3_HandL1"},
					{src:"players/images/_3_HandL1Red.png", id:"_3_HandL1Red"},
					{src:"players/images/_3_HandL2.png", id:"_3_HandL2"},
					{src:"players/images/_3_HandL3.png", id:"_3_HandL3"},
					{src:"players/images/_3_HandR1.png", id:"_3_HandR1"},
					{src:"players/images/_3_HandR1Red.png", id:"_3_HandR1Red"},
					{src:"players/images/_3_HandR2.png", id:"_3_HandR2"},
					{src:"players/images/_3_HandR3.png", id:"_3_HandR3"},
					{src:"players/images/_3_Head.png", id:"_3_Head"},
					{src:"players/images/_3_LegL1.png", id:"_3_LegL1"},
					{src:"players/images/_3_LegL2.png", id:"_3_LegL2"},
					{src:"players/images/_3_LegR1.png", id:"_3_LegR1"},
					{src:"players/images/_3_LegR2.png", id:"_3_LegR2"},
					{src:"players/images/_3_ShoeL.png", id:"_3_ShoeL"},
					{src:"players/images/_3_ShoeLRed.png", id:"_3_ShoeLRed"},
					{src:"players/images/_3_ShoeR.png", id:"_3_ShoeR"},
					{src:"players/images/_3_ShoeRRed.png", id:"_3_ShoeRRed"},
					{src:"players/images/_3_Torso.png", id:"_3_Torso"},
					{src:"players/images/_3_TorsoRed.png", id:"_3_TorsoRed"},
					{src:"players/images/_5_HandL1.png", id:"_5_HandL1"},
					{src:"players/images/_5_HandL1_Red.png", id:"_5_HandL1_Red"},
					{src:"players/images/_5_HandL2.png", id:"_5_HandL2"},
					{src:"players/images/_5_HandL3.png", id:"_5_HandL3"},
					{src:"players/images/_5_HandR1.png", id:"_5_HandR1"},
					{src:"players/images/_5_HandR1_Red.png", id:"_5_HandR1_Red"},
					{src:"players/images/_5_HandR2.png", id:"_5_HandR2"},
					{src:"players/images/_5_HandR3.png", id:"_5_HandR3"},
					{src:"players/images/_5_Head.png", id:"_5_Head"},
					{src:"players/images/_5_LegL1.png", id:"_5_LegL1"},
					{src:"players/images/_5_LegL2.png", id:"_5_LegL2"},
					{src:"players/images/_5_LegR1.png", id:"_5_LegR1"},
					{src:"players/images/_5_LegR2.png", id:"_5_LegR2"},
					{src:"players/images/_5_Neck.png", id:"_5_Neck"},
					{src:"players/images/_5_ShoeL.png", id:"_5_ShoeL"},
					{src:"players/images/_5_ShoeL_White.png", id:"_5_ShoeL_White"},
					{src:"players/images/_5_ShoeR.png", id:"_5_ShoeR"},
					{src:"players/images/_5_ShoeR_White.png", id:"_5_ShoeR_White"},
					{src:"players/images/_5_Torso.png", id:"_5_Torso"},
					{src:"players/images/_5_Torso_Red.png", id:"_5_Torso_Red"},
					{src:"players/images/_6_HandL1.png", id:"_6_HandL1"},
					{src:"players/images/_6_HandL1Red.png", id:"_6_HandL1Red"},
					{src:"players/images/_6_HandL2.png", id:"_6_HandL2"},
					{src:"players/images/_6_HandL3Down.png", id:"_6_HandL3Down"},
					{src:"players/images/_6_HandL3Up.png", id:"_6_HandL3Up"},
					{src:"players/images/_6_HandR1.png", id:"_6_HandR1"},
					{src:"players/images/_6_HandR1Red.png", id:"_6_HandR1Red"},
					{src:"players/images/_6_HandR2.png", id:"_6_HandR2"},
					{src:"players/images/_6_HandR3.png", id:"_6_HandR3"},
					{src:"players/images/_6_Head.png", id:"_6_Head"},
					{src:"players/images/_6_LegL1.png", id:"_6_LegL1"},
					{src:"players/images/_6_LegL2.png", id:"_6_LegL2"},
					{src:"players/images/_6_LegR1.png", id:"_6_LegR1"},
					{src:"players/images/_6_LegR2.png", id:"_6_LegR2"},
					{src:"players/images/_6_Neck.png", id:"_6_Neck"},
					{src:"players/images/_6_ShoeL.png", id:"_6_ShoeL"},
					{src:"players/images/_6_ShoeR.png", id:"_6_ShoeR"},
					{src:"players/images/_6_Torso1.png", id:"_6_Torso1"},
					{src:"players/images/_6_Torso1Red.png", id:"_6_Torso1Red"},
					{src:"players/images/_6_Torso2.png", id:"_6_Torso2"},
					{src:"players/images/_6_Torso2Red.png", id:"_6_Torso2Red"},
					{src:"players/images/_6_Torso3.png", id:"_6_Torso3"},
					{src:"players/images/_6_Torso3Red.png", id:"_6_Torso3Red"},
					{src:"players/images/Ball.png", id:"Ball"},
					{src:"players/images/Sit_Bedro_L.png", id:"Sit_Bedro_L"},
					{src:"players/images/Sit_Bedro_R.png", id:"Sit_Bedro_R"},
					{src:"players/images/Sit_Golen_L.png", id:"Sit_Golen_L"},
					{src:"players/images/Sit_Golen_R.png", id:"Sit_Golen_R"},
					{src:"players/images/Sit_Golova.png", id:"Sit_Golova"},
					{src:"players/images/Sit_Mayka.png", id:"Sit_Mayka"},
					{src:"players/images/Sit_Mayka_Red.png", id:"Sit_Mayka_Red"},
					{src:"players/images/Sit_Plecho_L.png", id:"Sit_Plecho_L"},
					{src:"players/images/Sit_Plecho_R.png", id:"Sit_Plecho_R"},
					{src:"players/images/Sit_Predpleche_L.png", id:"Sit_Predpleche_L"},
					{src:"players/images/Sit_Predpleche_R.png", id:"Sit_Predpleche_R"},
					{src:"players/images/Sit_Rukav_L.png", id:"Sit_Rukav_L"},
					{src:"players/images/Sit_Rukav_L_Red.png", id:"Sit_Rukav_L_Red"},
					{src:"players/images/Sit_Rukav_R.png", id:"Sit_Rukav_R"},
					{src:"players/images/Sit_Rukav_R_Red.png", id:"Sit_Rukav_R_Red"},
					{src:"players/images/Sit_Stopa_L.png", id:"Sit_Stopa_L"},
					{src:"players/images/Sit_Stopa_R.png", id:"Sit_Stopa_R"}
				],
				'jsLink' : 'players/players.js',
				'animations': [
					{
						name: 'lib.LeftPlayer',
						width: 245,
						height: 288
					},
					{
						name: 'lib.RightPlayer',
						width: 245,
						height: 288
					}
				]
			}
		]
	});
}