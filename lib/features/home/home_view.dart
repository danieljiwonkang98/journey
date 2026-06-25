import 'package:flutter/material.dart';
import 'package:journey/features/home/sections/belief_section.dart';
import 'package:journey/features/home/sections/dont_just_take_word.dart';
import 'package:journey/features/home/sections/faster_better_section.dart';
import 'package:journey/features/home/sections/home_main_section.dart';
import 'package:journey/features/home/sections/one_team_section.dart';
import 'package:journey/features/home/sections/over_big_guys.dart';
import 'package:journey/features/home/sections/speed_meet_quality.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: LayoutBuilder(
        builder: (context, constraints) {
          final sectionHeight = constraints.maxHeight;

          return SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                HomeMainSection(sectionHeight: sectionHeight),
                FasterBetterSection(sectionHeight: sectionHeight),
                BeliefSection(sectionHeight: sectionHeight),
                ColoredBox(
                  color: Colors.white,
                  child: Column(
                    children: const [
                      SpeedMeetQuality(),
                      OneTeamSection(),
                      OverBigGuys(),
                      DontJustTakeWord(),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
