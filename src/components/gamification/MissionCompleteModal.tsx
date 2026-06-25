import { Modal, Text, View } from 'react-native';

import { Tori } from '@/components/mascot';
import { Button, Card } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';
import type { MissionRow } from '@/types/database';

type MissionCompleteModalProps = {
  visible: boolean;
  missions: MissionRow[];
  onClose: () => void;
};

export function MissionCompleteModal({ visible, missions, onClose }: MissionCompleteModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.lg,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 360,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.backgroundCardElevated,
            padding: spacing.lg,
            alignItems: 'center',
            gap: spacing.md,
          }}
        >
          <Tori expression="cheering" size={96} />
          <Text style={typography.title}>
            {missions.length > 1 ? 'Missoes concluidas!' : 'Missao concluida!'}
          </Text>
          <View style={{ width: '100%', gap: spacing.sm }}>
            {missions.map((mission) => (
              <Card key={mission.id} style={{ gap: spacing.xs }}>
                <Text style={typography.bodyStrong}>{mission.title}</Text>
                <Text style={[typography.tiny, { color: colors.gold }]}>+{mission.xp_reward} XP</Text>
              </Card>
            ))}
          </View>
          <Button label="Continuar" onPress={onClose} style={{ width: '100%' }} />
        </View>
      </View>
    </Modal>
  );
}
