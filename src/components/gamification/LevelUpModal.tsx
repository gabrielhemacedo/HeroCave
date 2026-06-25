import { Modal, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Tori } from '@/components/mascot';
import { Button } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';

type LevelUpModalProps = {
  visible: boolean;
  newLevel: number;
  levelsGained: number;
  onClose: () => void;
};

export function LevelUpModal({ visible, newLevel, levelsGained, onClose }: LevelUpModalProps) {
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
        <LinearGradient
          colors={[colors.backgroundCardElevated, colors.backgroundCard]}
          style={{
            width: '100%',
            maxWidth: 360,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.lg,
            alignItems: 'center',
            gap: spacing.md,
          }}
        >
          <Tori expression="levelup" size={96} />
          <Text style={[typography.title, { color: colors.gold }]}>Subiu de nivel!</Text>
          <Text style={[typography.bodyStrong, { textAlign: 'center' }]}>
            Voce alcancou o nivel {newLevel}
            {levelsGained > 1 ? ` (+${levelsGained} niveis de uma vez!)` : ''}
          </Text>
          <Button label="Continuar" onPress={onClose} style={{ width: '100%' }} />
        </LinearGradient>
      </View>
    </Modal>
  );
}
