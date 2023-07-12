import { ApiKeysCreateModal } from "./CreateKeyModal";
import { toastMessages } from "./messages";
import { THIRDWEB_SERVICES } from "./services";
import { ApiKeyFormValues } from "./types";
import { useCreateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Icon, useDisclosure, useToast } from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { Button } from "tw-components";
import { toArrFromList } from "utils/string";

export const CreateApiKeyButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const form = useForm<ApiKeyFormValues>({
    values: {
      name: "API Key",
      domains: "*",
      // FIXME: Enable when wallets restrictions is in use
      // walletAddresses: "*",
      services: THIRDWEB_SERVICES.map((srv) => {
        return {
          name: srv.name,
          targetAddresses: "*",
          enabled: true,
          actions: srv.actions.map((sa) => sa.name),
        };
      }),
    },
  });

  const createKeyMutation = useCreateApiKey();
  const { onSuccess, onError } = useTxNotifications(
    "API key created",
    "Failed to create API key",
  );

  const handleSubmit = form.handleSubmit((values) => {
    const enabledServices = (values.services || []).filter(
      (srv) => !!srv.enabled,
    );

    if (enabledServices.length > 0) {
      const formattedValues = {
        name: values.name,
        domains: toArrFromList(values.domains),
        // FIXME: Enable when wallets restrictions is in use
        // walletAddresses: toArrFromList(values.walletAddresses),
        services: (values.services || [])
          .filter((srv) => srv.enabled)
          .map((srv) => ({
            ...srv,
            targetAddresses: toArrFromList(srv.targetAddresses),
          })),
      };

      createKeyMutation.mutate(formattedValues, {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
        onError: (err) => {
          onError(err);
        },
      });
    } else {
      toast(toastMessages.updateServices);
    }
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <ApiKeysCreateModal
        form={form}
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      <Button
        onClick={() => onOpen()}
        colorScheme="blue"
        leftIcon={<Icon as={FiPlus} boxSize={4} />}
        isLoading={createKeyMutation.isLoading}
        isDisabled={createKeyMutation.isLoading}
      >
        Create API Key
      </Button>
    </>
  );
};